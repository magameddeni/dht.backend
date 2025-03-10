import { pool } from ".."
import { ICategory, ICategoryAttribute } from "@/src/types"
import format from "pg-format"

interface ICreateAttributesPayload {
  parent_category: ICategory
  attributes: ICategoryAttribute[]
}

class AttributesService {
  async create({ parent_category: pr, attributes }: ICreateAttributesPayload) {
    const [data] = attributes.map((a) => ({
      values: [...Object.values(a), pr.id],
      keys: [Object.keys(a), "category_id"],
    }))
    const { keys, values } = data
    const queryText = `INSERT INTO category_attributes %s VALUES %L`
    const query = format(queryText, keys, values)
    const response = await pool.query(query)
    return response["rows"]
  }

  async get(categoryId: string) {
    const response = await pool.query(
      `SELECT * FROM category_attributes where category_id = $1`,
      [categoryId],
    )
    return response["rows"]
  }

  async delete(id: string) {
    const response = await pool.query(
      `DELETE FROM category_attributes where id = $1`,
      [id],
    )
    return response["rows"]
  }
}

export default new AttributesService()
