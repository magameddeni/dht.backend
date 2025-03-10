import multer from "multer"
import path from "path"
import fs from "fs"
import { v4 as uuidv4 } from "uuid"
import { IRequest } from "../types"

const storage = multer.diskStorage({
  destination: async (req: IRequest, file, cb) => {
    const uploadPath = path.join(__dirname, `../public`)
    if (!fs.existsSync(uploadPath))
      fs.mkdirSync(uploadPath, { recursive: true })
    cb(null, uploadPath)
  },
  filename: (req: IRequest, file, cb) => {
    const ext = path.extname(file.originalname)
    const fileName = `${uuidv4()}${ext}`
    cb(null, fileName)
  },
})

export const upload = multer({ storage: storage })
