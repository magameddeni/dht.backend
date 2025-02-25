import { Pool } from "pg"
import fs from "fs"

export const createCategories = async (pool: Pool, fileSrc: string) => {
  const categories = JSON.parse(fs.readFileSync(fileSrc, "utf-8"))

  for (let index = 0; index < categories.length; index++) {
    const element = categories[index]
    await pool.query(
      `INSERT INTO categories (name, icon, nesting, parent_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [element.category_name, element.icon, 0, null],
    )

    const { rows: parent_created } = await pool.query(
      `SELECT id FROM categories WHERE name = $1`,
      [element.category_name],
    )

    for (let index = 0; index < element.subcategories.length; index++) {
      const subcategories = element.subcategories[index]

      console.log(parent_created)

      await pool.query(
        `INSERT INTO categories (name, icon, nesting, parent_id) VALUES ($1, $2, $3, $4) RETURNING *`,
        [subcategories.category_name, element.icon, 1, parent_created[0].id],
      )

      const { rows: sub_parent_created } = await pool.query(
        `SELECT id FROM categories WHERE name = $1`,
        [subcategories.category_name],
      )

      for (let index = 0; index < subcategories.subcategories.length; index++) {
        const subcategoriesname = subcategories.subcategories[index]

        await pool.query(
          `INSERT INTO categories (name, icon, nesting, parent_id) VALUES ($1, $2, $3, $4) RETURNING *`,
          [subcategoriesname.name, element.icon, 2, sub_parent_created[0].id],
        )
      }
    }
  }
}
