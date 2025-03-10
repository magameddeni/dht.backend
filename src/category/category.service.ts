import fs from "fs"
import { pool } from ".."
import {
  ICategory,
  ICategoryBrand,
  ICategoryCountryManufacturer,
  ICategoryManufacturer,
} from "@/src/types"

class CategoryService {
  async create({ name, icon, nesting, parent_id }: ICategory) {
    const response = await pool.query(
      `INSERT INTO categories (name, icon, nesting, parent_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, icon, nesting, parent_id],
    )
    return response["rows"]
  }

  async createCategoryBrand({ category_id, brand_id }: ICategoryBrand) {
    const response = await pool.query(
      `INSERT INTO category_brand (category_id, brand_id) VALUES ($1, $2) RETURNING *`,
      [category_id, brand_id],
    )
    return response
  }

  async createCategoryCountryManufacturer({
    category_id,
    country_manufacturer_id,
  }: ICategoryCountryManufacturer) {
    const response = await pool.query(
      `INSERT INTO category_manufacturer (category_id, country_manufacturer_id) VALUES ($1, $2) RETURNING *`,
      [category_id, country_manufacturer_id],
    )
    return response
  }

  async createCategoryManufacturer({
    category_id,
    manufacturer_id,
  }: ICategoryManufacturer) {
    const response = await pool.query(
      `INSERT INTO category_manufacturer (category_id, manufacturer_id) VALUES ($1, $2) RETURNING *`,
      [category_id, manufacturer_id],
    )
    return response
  }

  async getCategories() {
    const { rows } = await pool.query(`SELECT * FROM categories`)

    return rows
  }
}

export default new CategoryService()
