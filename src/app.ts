import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import Cookie from "cookie-parser"
import userRouter from "./user/user.router"
import brandRouter from "./brand/brand.router"
import categoryRouter from "./category/category.router"
import productRouter from "./product/product.router"
import attributesRouter from "./attributes/attributes.router"
import fileRouter from "./files/file.router"
import { errorHandler, errorLogger } from "./lib"
import { PGPool } from "./database"
import { Pool } from "pg"

export class App {
  private app: express.Express
  private port: string | number
  postgresql: Pool

  constructor() {
    this.app = express()
    this.port = process.env.APP_PORT || 3000
    this.postgresql = new PGPool().connection
  }

  private useListen() {
    this.app.listen(this.port, async () => {
      console.log(
        `[server]: Server is running at http://localhost:${this.port}`,
      )
    })
  }

  private useHandlers() {
    this.app.use(cors())
    this.app.use(Cookie())
    this.app.use(express.json())
    this.app.use(express.static(__dirname + "/public"))
    this.app.use("/", userRouter)
    this.app.use("/category", categoryRouter)
    this.app.use("/brand", brandRouter)
    this.app.use("/product", productRouter)
    this.app.use("/file", fileRouter)
    this.app.use("/attributes", attributesRouter)
  }

  private useExectionFilter() {
    this.app.use(errorLogger)
    this.app.use(errorHandler)
  }

  init() {
    console.log(`[server]: Running...`)
    this.useExectionFilter()
    this.useHandlers()
    this.postgresql
    this.useListen()
  }
}
