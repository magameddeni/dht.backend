import { pool } from ".."
import { ICategory } from "../types"

class CategoryService {
  async create({
    category_name,
    icon,
    category_nesting,
    parent_id,
  }: ICategory) {
    const response = await pool.query(
      `INSERT INTO categories (category_name, icon, category_nesting, parent_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [category_name, icon, category_nesting, parent_id],
    )
    return response
  }

  async getCategories() {
    const { rows } = await pool.query(
      `SELECT * FROM categories c WHERE c.category_nesting = 0`,
    )

    return rows
  }
}

export default new CategoryService()
