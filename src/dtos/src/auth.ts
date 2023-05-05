export interface ReqRegisterDto {
  username: string
  password: string
  email: string
  role: string
  tel: string
}

export interface ReqLoginDto {
  email: string
  password: string
}
