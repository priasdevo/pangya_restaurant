import { model, Schema } from 'mongoose'
import { IReservation } from '../schemas/interface'

const reservationSchema = new Schema<IReservation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: 'restaurants',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'Reservations',
  },
)

const Reservation = model<IReservation>('reservations', reservationSchema)

export default Reservation
