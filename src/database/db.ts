import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  mongoose.set('strictQuery', true)
  const conn = await mongoose.connect(process.env.MONGO_URI!)

  console.log(`MongoDB Connected: ${conn.connection.host}`)
}

export default connectDB
