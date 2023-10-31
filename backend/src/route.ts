import { create, show } from "@/api/v1/short_url"
import { connectDb } from "@/db/connect_db"
import { Application } from "express"


export const route = (app: Application) => {

  app.get('/healthcheck', (req, res, next) => {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
      db_status: 'OK'
    }
    connectDb().then(({ client, release }) => {
      client.query('SELECT 1').then(() => {
        res.json(healthcheck)
      }, () => {
        healthcheck.db_status = 'Error'
      }).finally(() => {
        release()
        next()
      })
    })
  })
  app.post('/s', create)
  app.get('/s/:slug', show)

}
