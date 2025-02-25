import { Router } from "express"
import { asyncWrapper } from "../lib"
import brandContoller from "./brand.contoller"

const router = Router()

router.post("/", asyncWrapper(brandContoller.create))

export default router
