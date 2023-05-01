import express from 'express'
import {
  createReservation,
  getAllReservations,
  getReservation,
  updateReservation,
  deleteReservation,
} from '../controllers/reservation'
import {
  authorize,
  protect,
  checkReservationOwnership,
} from '../middleware/auth'

const router = express.Router()

router
  .route('/')
  .get(protect, getAllReservations)
  .post(protect, createReservation)

router
  .route('/:id')
  .get(protect, checkReservationOwnership, getReservation)
  .put(protect, checkReservationOwnership, updateReservation)
  .delete(protect, checkReservationOwnership, deleteReservation)

export default router
