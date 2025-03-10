import { Request, Response } from "express"
import categoryService from "./category.service"

class CategoryController {
  async create(req: Request, res: Response) {
    const data = req.body
    const response = await categoryService.create(data)
    res.status(200).json(response)
  }

  async createManufacturer(req: Request, res: Response) {
    await categoryService.createCategoryManufacturer(req.body)
    res.status(200).json("OK")
  }

  async createBrand(req: Request, res: Response) {
    await categoryService.createCategoryBrand(req.body)
    res.status(200).json("OK")
  }

  async createCountryManufacturer(req: Request, res: Response) {
    await categoryService.createCategoryCountryManufacturer(req.body)
    res.status(200).json("OK")
  }

  async getCategories(req: Request, res: Response) {
    const categories = await categoryService.getCategories()
    res.status(200).json(categories)
  }
}

export default new CategoryController()
