export const createFunctionGetBrandIdByName = `CREATE OR REPLACE FUNCTION getBrandId (brandName TEXT) RETURNS INT AS $$
	DECLARE 
	    brand_id int;
	BEGIN 
	    SELECT id INTO brand_id FROM brands WHERE name = brandName;
	    IF NOT FOUND THEN 
	        INSERT INTO brands (name) VALUES (brandName) RETURNING id INTO brand_id;
	    END IF;
	    RETURN brand_id;
	END;
$$ LANGUAGE plpgsql;`

export const createFunctionGetManufacturerIdByName = `CREATE OR REPLACE FUNCTION getManufacturerId (manufacturerName TEXT) RETURNS INT AS $$
	DECLARE 
	    manufacturer_id INT;
	BEGIN 
	    SELECT id INTO manufacturer_id FROM manufacturer WHERE name = manufacturerName;
	    IF NOT FOUND THEN 
	        INSERT INTO manufacturer (name) VALUES (manufacturerName) RETURNING id INTO manufacturer_id;
	    END IF;
	    RETURN manufacturer_id;
	END;
$$ LANGUAGE plpgsql;`

export const createFunctionGetCountryManufacturerIdByName = `CREATE OR REPLACE FUNCTION getCountryManufacturerId (countryManufacturerName TEXT) RETURNS INT AS $$
	DECLARE 
	    country_manufacturer_id INT;
	BEGIN 
	    SELECT id INTO country_manufacturer_id FROM country_manufacturer WHERE name = countryManufacturerName;
	    IF NOT FOUND THEN 
	        INSERT INTO country_manufacturer (name) VALUES (countryManufacturerName) RETURNING id INTO country_manufacturer_id;
	    END IF;
	    RETURN country_manufacturer_id;
	END;
$$ LANGUAGE plpgsql;`

export const createFunctionAddCategoryAttributes = `
CREATE OR REPLACE FUNCTION addCategoryAttributes (ca_name TEXT, ca_value TEXT, c_id INT, ca_type TEXT, ca_unit TEXT, ca_required BOOLEAN) RETURNS INT AS $$
	DECLARE 
	    category_attribute_id INT;
	BEGIN 
	    SELECT id INTO category_attribute_id FROM category_attributes WHERE attribute_name = a_name AND category_id =  c_id;
	    IF NOT FOUND THEN 
	        INSERT INTO category_attributes (category_id, attribute_name, data_type, required, unit) VALUES (
				c_id, ca_name, ca_type, ca_reqired, ca_unit
			) RETURNING id INTO category_attribute_id;
	    END IF;
	    RETURN category_attribute_id;
	END;
$$ LANGUAGE plpgsql;`

export const createFunctionGetProductVariants = `CREATE OR REPLACE FUNCTION  getProductVariantsAndImagesByProductId(product_id INT) 
RETURNS jsonb AS $$
BEGIN
    RETURN (
     SELECT  
            JSONB_AGG(
                jsonb_build_object(
                    'id', pv.id, 
                    'base_price', pv.base_price,
                    'stock_quantity', pv.stock_quantity,
                    'color_name', pv.color_name,
                    'color_hex', pv.color_hex,
                    'product_images', (
                        SELECT JSONB_AGG(
                            jsonb_build_object(
                                'id', pf.id,
                                'file_type', pf.file_type,
                                'file_key', pf.file_key,
                                'file_link', pf.file_link,
                                'file_order', pf.file_order
                            )
                        )
                        FROM product_file pf 
                        WHERE pf.product_variant_id = pv.id
                    )
                )
            )
        FROM product_variant pv
        WHERE pv.product_id = $1
    );
END;
$$ LANGUAGE plpgsql;`

export const createFunctionGetParentCategories = `CREATE OR REPLACE FUNCTION getParentCategories(start_id INT) RETURNS jsonb AS $$
DECLARE
    result jsonb;
BEGIN 
    WITH RECURSIVE get_categories AS ( 
        SELECT id, name, icon, parent_id, nesting
        FROM categories 
        WHERE id = start_id 
        UNION ALL 
        SELECT c.id, c.name, c.icon, c.parent_id, c.nesting
        FROM categories c
        INNER JOIN get_categories gc ON gc.parent_id = c.id 
    ) 
    SELECT jsonb_agg(to_jsonb(c)) INTO result 
    FROM get_categories c;

    RETURN result;
END;
$$ LANGUAGE plpgsql;`
