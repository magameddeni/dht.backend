import { Router } from "express"
import categoryController from "./category.controller"
import { asyncWrapper } from "../lib"

const router = Router()

router.post("/", asyncWrapper(categoryController.create))
router.post(
  "/manufacturer",
  asyncWrapper(categoryController.createManufacturer),
)
router.post("/brand", asyncWrapper(categoryController.createBrand))
router.post(
  "/country-manufacturer",
  asyncWrapper(categoryController.createCountryManufacturer),
)

router.get("/", asyncWrapper(categoryController.getCategories))

export default router
