import express from 'express'
import { login, logout, register } from '../controllers/auth'
import { protect } from '../middleware/auth'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

export default router
