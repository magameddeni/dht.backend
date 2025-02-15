import { App } from "./app"

const app = new App()
export const pool = app.postgresql
app.init()
