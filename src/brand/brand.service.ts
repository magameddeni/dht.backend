import { pool } from ".."
import { IBrand } from "@/src/types"

class BrandService {
  async createBanner({ brand_name, icon }: IBrand) {
    await pool.query("INSERT INTO brands (brand_name, icon) VALUES ($1, $1)", [
      brand_name,
      icon,
    ])
  }

  async getBrandCategoriesAndProducts(id: string) {}
}

export default new BrandService()
