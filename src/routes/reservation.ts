import express from 'express'
import {
  createReservation,
  getAllReservations,
  getReservation,
  updateReservation,
  deleteReservation,
  getHistory,
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

router.route('/history').get(protect, getHistory)

router
  .route('/:id')
  .get(protect, checkReservationOwnership, getReservation)
  .put(protect, checkReservationOwnership, updateReservation)
  .delete(protect, checkReservationOwnership, deleteReservation)

export default router
