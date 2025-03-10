import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      res.status(400).json({
        success: false,
        errors: errors.array(),
      })
    else next()
  } catch (error) {
    res
      .status(400)
      .json({ success: false, errors: ["Ошибка на стороне сервера"] })
  }
}
