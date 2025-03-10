import { Request, Response } from "express"
import attributesService from "./attributes.service"

class CategoryController {
  async create(req: Request, res: Response) {
    const data = req.body
    const response = await attributesService.create(data)
    res.status(200).json(response)
  }

  async get(req: Request, res: Response) {
    const { categoryId } = req.params
    const response = await attributesService.get(categoryId as string)
    res.status(200).json(response)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    const response = await attributesService.delete(id as string)
    res.status(200).json(response)
  }
}

export default new CategoryController()
