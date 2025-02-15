class Config {
  get(key: string) {
    const value = process.env[key]
    if (!value) throw new Error("Не верный ключ: " + key)
    return value
  }
}

export default new Config()
