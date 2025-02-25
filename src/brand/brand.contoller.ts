import { Request, Response } from "express"
import brandService from "./brand.service"

class BrandController {
  async create(req: Request, res: Response) {
    const { brand_name, icon } = req.body
    await brandService.createBanner({ brand_name, icon })
    res.status(200).json("OK")
  }
}

export default new BrandController()
