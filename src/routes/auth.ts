import express from 'express'
import { login, register } from '../controllers/auth'
import { protect } from '../middleware/auth'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

export default router
