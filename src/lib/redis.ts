import Redis from "ioredis"
import config from "../config/config"

export const redis = new Redis(config.get("REDIS_HOST"), {
  password: config.get("REDIS_PASSWORD"),
})
