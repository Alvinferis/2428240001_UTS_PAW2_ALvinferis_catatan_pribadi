import express from 'express'

import CatatanController from '../controllers/catatan.controller.js'
import timeMiddleware from '../middleware/time.middleware.js'

const router = express.Router()

router.use(timeMiddleware)

router.get('/catatan', CatatanController.index)
router.get('/catatan/:id', CatatanController.show)
router.post('/catatan', CatatanController.store)
router.put('/catatan/:id', CatatanController.update)
router.delete('/catatan/:id', CatatanController.delete)

export default router