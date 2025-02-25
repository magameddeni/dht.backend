import { Request, Response } from "express"
import productService from "./product.service"

class ProductController {
  async create(req: Request, res: Response) {
    const response = await productService.create(req.body)
    res.status(200).json(response)
  }

  async getByCategoryId(req: Request, res: Response) {
    const { categoryId } = req.params
    const response = await productService.getByCategoryId(categoryId)
    res.status(200).json(response)
  }
}

export default new ProductController()
