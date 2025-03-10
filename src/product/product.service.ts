import { pool } from ".."
import format from "pg-format"
import { attributesSortKeys, filesSortKeys } from "../config"

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
    attributes,
  }: any) {
    // TODO: переделать тип пропсов
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
              attributes TEXT[][];
              a_index INT;
              files TEXT[][]; 
              file_i INT;
              categoryId INT;
          BEGIN
              files := ARRAY[%s];
              brandId := getBrandId(%L); 
              manufacturerId := getManufacturerId(%L); 
              countryManufacturerId := getCountryManufacturerId(%L);
              attributes := ARRAY[%s];
              categoryId := %L;

              INSERT INTO products 
                (category_id, seller_id, description, weight, height, length, width, brand_id, manufacturer_id, country_manufacturer_id)
              VALUES 
                (categoryId, %L, %L, %L, %L, %L, %L, brandId, manufacturerId, countryManufacturerId)
              RETURNING id INTO productId; 

              INSERT INTO product_variant 
              (product_id, base_price, stock_quantity, color_name, color_hex) 
              VALUES (productId, %L, %L, %L, %L)
              RETURNING id INTO productVariantId;  
              
              FOR file_i IN 1..array_length(files, 1) LOOP 
                INSERT INTO product_file 
                  (product_variant_id, file_type, file_key, file_link, file_order) 
                VALUES 
                  (productVariantId, files[file_i][1], files[file_i][2], files[file_i][3], files[file_i][4]::INTEGER);
              END LOOP;
               
              FOR a_index IN 1..array_length(attributes, 1) LOOP 
                PERFORM * FROM category_attributes WHERE attribute_name = attributes[a_index][1] AND category_id =  categoryId;
                IF NOT FOUND THEN 
                    INSERT INTO category_attributes 
                    (attribute_name, category_id, data_type, required, unit) VALUES 
                    ( attributes[a_index][1], categoryId, attributes[a_index][2], attributes[a_index][3]::boolean, attributes[a_index][4]);
                END IF; 
              END LOOP;  

              FOR a_index IN 1..array_length(attributes, 1) LOOP 
                    INSERT INTO product_attributes 
                    (attribute_name, attribute_value, product_id) VALUES 
                    ( attributes[a_index][1], attributes[a_index][5], productId);
              END LOOP; 
        END $$;`

      files = files
        .map((item: Record<string, string>) =>
          format(`ARRAY[%L, %L, %L, %L]`, ...filesSortKeys.map((a) => item[a])),
        )
        .join(", ")

      attributes = attributes
        .map((item: Record<string, string>) =>
          format(
            `ARRAY[%L, %L, %L, %L, %L]`,
            ...attributesSortKeys.map((a) => item[a]),
          ),
        )
        .join(", ")

      const query = format(
        queryText,
        files,
        brand_name,
        manufacturer_name,
        country_manufacturer,
        attributes,
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
      console.error(error)
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
