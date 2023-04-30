import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import connectDB from './config/db'

dotenv.config({ path: './config/.env' })
connectDB()

const app = express()
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log('Server running in', process.env.NODE_ENV, 'mode on port', PORT)
})

// Handle promise rejection
process.on('unhandledRejection', (err: Error, Promise) => {
  console.log(`Error: ${err.message}`)
  // close server
  server.close(() => process.exit(1))
})
