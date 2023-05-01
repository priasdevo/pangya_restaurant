import express from 'express'
import {
  createReservation,
  getAllReservations,
  getReservation,
  updateReservation,
  deleteReservation,
} from '../controllers/reservation'
import { authorize, protect } from '../middleware/auth'

const router = express.Router()

router.route('/').get(protect, getAllReservations)
router
  .route('/:id')
  .get(protect, getReservation)
  .post(protect, createReservation)
  .put(protect, updateReservation)
  .delete(protect, deleteReservation)
