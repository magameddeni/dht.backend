import jwt from "jsonwebtoken"
import config from "../config/config"
import {
  GENERATE_ACCESS_TOKEN_OPTION,
  GENERATE_REFRESH_TOKEN_OPTION,
} from "../config"

class JwtService {
  generateAccessToken(user: {
    _id: any
    email?: string | null
    phoneNumber: string
  }) {
    const { _id, email, phoneNumber } = user

    return jwt.sign(
      { _id, email, phoneNumber },
      config.get("ACCESS_TOKEN_SECRET"),
      GENERATE_ACCESS_TOKEN_OPTION,
    )
  }

  generateRefreshToken(user: {
    _id: any
    email?: string | null
    phoneNumber: string
  }) {
    const { _id, email, phoneNumber } = user
    return jwt.sign(
      { _id, email, phoneNumber },
      config.get("REFRESH_TOKEN_SECRET"),
      GENERATE_REFRESH_TOKEN_OPTION,
    )
  }

  async updateRefreshToken(token: string, newToken: string) {
    // TODO
    return
  }

  async saveRefreshToken(userId: string, token: string) {
    // TODO
    return
  }

  async verifyAccessToken(access: string) {
    return jwt.verify(access, config.get("ACCESS_TOKEN_SECRET"))
  }

  async verifyRefreshToken(token: string) {
    return jwt.verify(token, config.get("REFRESH_TOKEN_SECRET"))
  }

  async deleteToken(token?: string, userId?: string) {
    // TODO
    return
  }
}

export default new JwtService()
