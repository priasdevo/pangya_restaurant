import userModel from '../database/models/user'
import { ReqLoginDto, ReqRegisterDto } from '../dtos'
import { Request, Response } from 'express'
import { IUser } from '../database/schemas/interface'
//@desc Register User
//@route POST /auth/register
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

//@desc  Login user
//@route POST /auth/login
//@access Public
export const login = async (req: Request, res: Response) => {
  console.log('User login')
  try {
    const reqBody: ReqLoginDto = req.body
    const { username, password } = reqBody
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        msg: 'Please provide an username and password',
      })
    }

    const user = await userModel.findOne({ username }).select('+password')
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: 'Invalid credentials' })
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, msg: 'Invalid credentials' })
    }

    sendTokenResponse(user, 200, res)
  } catch (err) {
    res.status(400).json({ success: false })
    console.log(err)
  }
}

//@desc Logout user
//@route GET /auth/logout
//@access Private
export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.token
  if (token) {
    // Add the token to the blacklist
    // Clear the cookie
    res.clearCookie('token')
  }
  res.status(200).json({ success: true, msg: 'Logged out successfully' })
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
