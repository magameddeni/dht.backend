import { Router } from "express"
import categoryController from "./category.controller"
import { asyncWrapper } from "../lib"

const router = Router()

router.post("/", asyncWrapper(categoryController.create))
router.get("/", asyncWrapper(categoryController.getCategories))

export default router
