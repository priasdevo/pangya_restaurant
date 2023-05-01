import { Request, Response } from 'express'
import ReservationModel from '../database/models/reservation'

// @desc Create reservation
// @route POST /reservations
// @access Public
export const createReservation = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id

    // Check if the user has already 3 reservations
    const existingReservations = await ReservationModel.find({
      userId,
      status: 'pending',
    }).countDocuments()

    if (existingReservations >= 3) {
      return res.status(400).json({
        success: false,
        message: 'User can only have up to 3 pending reservations',
      })
    }

    const reservationData = { ...req.body, userId }
    const reservation = await ReservationModel.create(reservationData)
    res.status(201).json({ success: true, data: reservation })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

// @desc Get all reservations
// @route GET /reservations
// @access Public
export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    const role = req.user?.role

    let reservations

    if (role === 'admin') {
      reservations = await ReservationModel.find()
    } else {
      reservations = await ReservationModel.find({ userId })
    }

    res.status(200).json({ success: true, data: reservations })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

// @desc Get single reservation
// @route GET /reservations/:id
// @access Public
export const getReservation = async (req: Request, res: Response) => {
  try {
    const reservation = await ReservationModel.findById(req.params.id)
    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: 'Reservation not found' })
    }
    res.status(200).json({ success: true, data: reservation })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

// @desc Update reservation
// @route PUT /reservations/:id
// @access Public
export const updateReservation = async (req: Request, res: Response) => {
  try {
    const reservation = await ReservationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )

    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: 'Reservation not found' })
    }

    res.status(200).json({ success: true, data: reservation })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

// @desc Delete reservation
// @route DELETE /reservations/:id
// @access Public
export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const reservation = await ReservationModel.findByIdAndDelete(req.params.id)

    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: 'Reservation not found' })
    }

    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}
