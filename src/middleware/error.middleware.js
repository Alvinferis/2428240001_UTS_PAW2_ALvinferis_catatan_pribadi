import z, { ZodError } from 'zod'

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'
  let errors = err.errors || null

  if (err instanceof ZodError) {
    statusCode = 422
    message = 'Validation error'
    errors = z.flattenError(err).fieldErrors
  } else if (err.code === 11000) {
    statusCode = 409
    message = 'Data sudah tersedia'
  } else if (err.name === 'CastError') {
    statusCode = 400
    message = 'ID tidak valid'
  }

  return res.status(statusCode).json({
    meta: {
      status: statusCode,
      message,
    },
    ...(errors && { errors }),
  })
}

export const notFoundHandler = (req, res, next) => {
  return res.status(404).json({
    meta: {
      status: 404,
      message: `Resource not found: ${req.method} ${req.originalUrl}`,
    },
  })
}