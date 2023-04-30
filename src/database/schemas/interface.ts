import { Schema } from 'mongoose'

export interface IUser {
  _id: Schema.Types.ObjectId
  username: string
  password: string
  email: string
  tel: string
  role: string // to ENUM
  reservation: Schema.Types.ObjectId[]

  getSignedJwtToken: () => string
  matchPassword: (enteredPassword: string) => Promise<boolean>
}

export interface IReservation {
  _id: Schema.Types.ObjectId
  userId: Schema.Types.ObjectId
  restaurantId: Schema.Types.ObjectId
  date: Date
}

export interface IRestaurant {
  _id: Schema.Types.ObjectId
  name: string
  address: string
  tel: string
  open_time: Date
  close_time: Date
}