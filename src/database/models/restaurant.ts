import { model, Schema } from 'mongoose'
import { IRestaurant } from '../schemas/interface'

const restaurantSchema = new Schema<IRestaurant>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    open_time: {
      type: Date,
      required: true,
    },
    close_time: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'Restaurants',
  },
)

// Helper function to convert string time to Date object

const Restaurant = model<IRestaurant>('restaurants', restaurantSchema)

export default Restaurant
