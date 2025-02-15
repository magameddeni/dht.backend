import { Request, Response } from "express"
import categoryService from "./category.service"

class CategoryController {
  create(req: Request, res: Response) {
    const data = req.body
    const response = categoryService.create(data)
    res.status(200).json(response)
  }

  async getCategories(req: Request, res: Response) {
    const categories = await categoryService.getCategories()
    res.status(200).json(categories)
  }
}

export default new CategoryController()
