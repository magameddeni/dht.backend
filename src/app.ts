import express from "express"
import dotenv from "dotenv"
dotenv.config()
import config from "./config/config"
import cors from "cors"
import Cookie from "cookie-parser"
import userRouter from "./user/user.router"
import categoryRouter from "./category/category.router"
import { errorHandler, errorLogger } from "./lib"
import { PGPool } from "./database"
import { IConfig } from "./types"
import { Pool } from "pg"

export class App {
  private app: express.Express
  private port: string | number
  private config: IConfig
  postgresql: Pool

  constructor() {
    this.config = config
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
    this.app.use(express.static("public"))
    this.app.use("/", userRouter)
    this.app.use("/category", categoryRouter)
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
