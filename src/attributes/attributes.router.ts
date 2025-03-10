import { Router } from "express"
import attributesController from "./attributes.controller"
import { asyncWrapper } from "../lib"
import {
  createAttributesValidateSchema,
  getAttributesSchema,
} from "./validate.schema"
import { adminMiddleware, validateMiddleware } from "../middleware"

const router = Router()

router.post(
  "/",
  adminMiddleware,
  createAttributesValidateSchema,
  validateMiddleware,
  asyncWrapper(attributesController.create),
)

router.get(
  "/:categoryId",
  adminMiddleware,
  getAttributesSchema,
  validateMiddleware,
  asyncWrapper(attributesController.get),
)

router.delete(
  "/:id",
  adminMiddleware,
  asyncWrapper(attributesController.delete),
)

export default router
