import express from 'express'
import {
  createRestaurant,
  getRestaurant,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant,
} from '../controllers/restaurant'

import { authorize, protect } from '../middleware/auth'

const router = express.Router()

router
  .route('/')
  .get(protect, getRestaurants)
  .post(protect, authorize('admin'), createRestaurant)
router
  .route('/:id')
  .get(protect, getRestaurant)
  .put(protect, authorize('admin'), updateRestaurant)
  .delete(protect, authorize('admin'), deleteRestaurant)

export default router
