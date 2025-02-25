import { pool } from ".."
import format from "pg-format"

class ProductService {
  async create({
    brand_name,
    manufacturer_name,
    country_manufacturer,
    category_id,
    seller_id,
    description,
    width,
    height,
    length,
    weight,
    base_price,
    stock_quantity,
    color_name,
    color_hex,
    files,
  }: any) {
    const client = await pool.connect()
    await client.query(`BEGIN`)

    try {
      const queryText = `
        DO $$
          DECLARE
              productId INT;
              productVariantId INT;
              brandId INT; 
              manufacturerId INT; 
              countryManufacturerId INT; 
              file_data TEXT[][]; 
              fd_index INT;
          BEGIN
               file_data := ARRAY[%s];
              brandId := getBrandId(%L); 
              manufacturerId := getManufacturerId(%L); 
              countryManufacturerId := getCountryManufacturerId(%L);

              INSERT INTO products 
                (category_id, seller_id, description, weight, height, length, width, brand_id, manufacturer_id, country_manufacturer_id)
              VALUES 
                (%L, %L, %L, %L, %L, %L, %L, brandId, manufacturerId, countryManufacturerId)
              RETURNING id INTO productId; 

              INSERT INTO product_variant 
              (product_id, base_price, stock_quantity, color_name, color_hex) 
              VALUES (productId, %L, %L, %L, %L)
              RETURNING id INTO productVariantId;  
              
              FOR fd_index IN 1..array_length(file_data, 1) LOOP 
                INSERT INTO product_file 
                  (product_variant_id, file_type, file_key, file_link, file_order) 
                VALUES 
                  (productVariantId, file_data[fd_index][1], file_data[fd_index][2], file_data[fd_index][3], file_data[fd_index][4]::INTEGER);
              END LOOP;
        END $$;`

      const formattedFiles = files
        .map((file: any) =>
          format("ARRAY[%L, %L, %L, %L]", file[0], file[1], file[2], file[3]),
        )
        .join(", ")

      const query = format(
        queryText,
        formattedFiles,
        brand_name,
        manufacturer_name,
        country_manufacturer,
        category_id,
        seller_id,
        description,
        weight,
        height,
        length,
        width,
        base_price,
        stock_quantity,
        color_name,
        color_hex,
      )

      const response = await client.query(query)
      await client.query(`COMMIT`)

      return response["rows"]
    } catch (error) {
      await client.query("ROLLBACK")
      console.error("Ошибка при выполнении транзакции:", error)
    } finally {
      if (client) client.release()
    }
  }

  async getByCategoryId(categoryId: string | unknown) {
    const queryText = `
    SELECT 
        p.id, 
        p.width, 
        p.weight, 
        p.length, 
        p.height, 
        p.description, 
        p.created_at,
      p.category_id,
        (SELECT name FROM brands WHERE p.brand_id = brands.id) AS brand_name,
        (SELECT name FROM manufacturer WHERE p.manufacturer_id = manufacturer.id) AS manufacturer_name,
        (SELECT name FROM country_manufacturer cm WHERE p.country_manufacturer_id = cm.id) AS country_manufacturer_name,
        getProductVariantsAndImagesByProductId(p.id) AS product_variants,
      getParentCategories(p.category_id) AS categories
    FROM products p
    WHERE p.category_id = %L`

    const query = format(queryText, categoryId)
    const rows = await pool.query(query)

    return rows["rows"]
  }
}

export default new ProductService()
