import userModel from '../database/models/user'
import jwt from 'jsonwebtoken'
import { ReqRegisterDto } from '../dtos'
import { Request, Response } from 'express'
import { Model } from 'mongoose'
import { IUser } from '../database/schemas/interface'

//@desc Register User
//@route POST /user/register
//@access Public
export const register = async (req: Request, res: Response) => {
  console.log('Register user')
  try {
    const reqBody: ReqRegisterDto = req.body
    const { username, password, email, role, tel } = reqBody

    const user = await userModel.create({
      username,
      password,
      email,
      tel,
      role,
    })

    sendTokenResponse(user, 200, res)
  } catch (err) {
    res.status(400).json({ success: false })
    console.log(err)
  }
}

//Get token from model, create cookie and send response
const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
  const token = user.getSignedJwtToken()

  const expiresIn = Number(process.env.JWT_COOKIE_EXPIRE!) * 24 * 60 * 60 * 1000
  const options = {
    expires: new Date(Date.now() + expiresIn),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  }
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  })
}
