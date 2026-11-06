const timeMiddleware = (req, res, next) => {
  const timeStart = Date.now()

  res.on('finish', () => {
    const timeEnd = Date.now()

    const log = {
      timeStart: new Date(timeStart).toISOString(),
      timeEnd: new Date(timeEnd).toISOString(),
      duration: timeEnd - timeStart,
    }

    console.log(log)
  })

  next()
}

export default timeMiddleware