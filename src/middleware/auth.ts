import jwt, { JwtPayload } from 'jsonwebtoken'
import user from '../database/models/user'
import { NextFunction, Request, Response } from 'express'
import { IUser } from '../database/schemas/interface'

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null // TODO: Update User with the appropriate type
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  //make sure token exist
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Not authorize to access this route' })
  }

  try {
    const decoded: JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as JwtPayload

    console.log(decoded)

    req.user = await user.findById(decoded.id)
    next()
  } catch (err) {
    console.log(err)
    return res
      .status(401)
      .json({ success: false, error: 'Not authorized to access this route' })
  }
}

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role!)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user?.role} is not authorized to access tihs route`,
      })
    }
    next()
  }
}