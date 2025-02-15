import { Pool } from "pg"

class PGPool {
  private pool: Pool

  constructor() {
    this.pool = new Pool()
  }

  get connection() {
    return this.pool
  }
}

export default PGPool
