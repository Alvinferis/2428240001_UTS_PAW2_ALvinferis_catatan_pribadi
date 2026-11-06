import express from 'express'

import apiRoutes from './routes/api.routes.js'
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app