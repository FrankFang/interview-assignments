import { route } from '@/route'
import express from 'express'
export const app = express()

app.use(express.json())
route(app)


