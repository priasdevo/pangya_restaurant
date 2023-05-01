import { Request, Response } from 'express'
import RestaurantModel from '../database/models/restaurant'

// @desc Create a restaurant
// @route POST /restaurants
// @access Private
export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await RestaurantModel.create(req.body)
    res.status(201).json({ success: true, data: restaurant })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

// @desc Get a specific restaurant
// @route GET /restaurants/:id
// @access Public
export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.id)

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, msg: 'Restaurant not found' })
    }

    res.status(200).json({ success: true, data: restaurant })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

// @desc Get all restaurants with optional query and pagination
// @route GET /restaurants
// @access Public
export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1 // current page number
    const limit = Number(req.query.limit) || 10 // number of items per page
    const select = req.query.select
      ? (req.query.select as string).split(',')
      : [] // fields to select
    const sort = req.query.sort ? (req.query.sort as string).split(',') : [] // fields to sort

    const searchQuery = req.query.search
      ? {
          name: {
            $regex: new RegExp(req.query.search as string, 'i'),
          },
        }
      : {}

    const count = await RestaurantModel.countDocuments(searchQuery)
    const restaurants = await RestaurantModel.find(searchQuery)
      .select(select.join(' '))
      .sort(sort.join(' '))
      .limit(limit)
      .skip(limit * (page - 1))

    res.status(200).json({
      success: true,
      data: restaurants,
      page,
      totalPages: Math.ceil(count / limit),
    })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

// @desc Update a restaurant
// @route PUT /restaurants/:id
// @access Private
export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await RestaurantModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, msg: 'Restaurant not found' })
    }

    res.status(200).json({ success: true, data: restaurant })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

// @desc Delete a restaurant
// @route DELETE /restaurants/:id
// @access Private
export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await RestaurantModel.findByIdAndDelete(req.params.id)

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, msg: 'Restaurant not found' })
    }

    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}
