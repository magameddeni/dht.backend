import { Router } from "express"
import { asyncWrapper } from "../lib"
import productController from "./product.controller"
import { createProductValidateSchema } from "./validate.schema"
import { validateMiddleware, adminMiddleware } from "../middleware"

const router = Router()

router.post(
  "/",
  adminMiddleware,
  createProductValidateSchema,
  validateMiddleware,
  asyncWrapper(productController.create),
)
router.get(
  "/category/:categoryId",
  asyncWrapper(productController.getByCategoryId),
)

export default router
