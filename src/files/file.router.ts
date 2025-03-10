import { Router } from "express"
import { asyncWrapper } from "../lib"
import fileController from "./file.controller"
import { upload } from "../lib/multer"

const router = Router()

router.post("/", upload.array("files"), asyncWrapper(fileController.upload))
router.delete("/", asyncWrapper(fileController.upload))

export default router
