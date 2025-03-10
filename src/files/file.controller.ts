import { Request, Response } from "express"
import fs from "fs"
import fileService from "./file.service"

class FileController {
  async upload(req: Request, res: Response) {
    const files = req.files
    if (Array.isArray(files)) await fileService.upload(files)
    res.status(200).json(files)
  }

  deleteFile(req: Request, res: Response) {
    const fileName = req.body

    fs.rm(__dirname + "/" + fileName, (err) => {
      if (err) res.status(400).json("Не удалось удалить файл!")
    })

    res.status(200).json("OK")
  }
}

export default new FileController()
