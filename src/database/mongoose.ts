import mongoose from "mongoose"
import { IConfig } from "@/src/types"

class MongooseConnect {
  config: IConfig

  constructor(config: IConfig) {
    this.config = config
  }

  async connect() {
    try {
      mongoose.connect(this.config.get("MONGO_URL"))
      console.log(`[mongoose]: Success connect to Mongoose`)
    } catch (error) {
      console.log(`[mongo]: Fatal error connect to Mongoose`, error)
    }
  }
}

export default MongooseConnect
