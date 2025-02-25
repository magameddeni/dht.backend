import { Router } from "express"
import { asyncWrapper } from "../lib"
import productController from "./product.controller"

const router = Router()

router.post("/", asyncWrapper(productController.create))
router.get("/:categoryId", asyncWrapper(productController.getByCategoryId))

export default router
