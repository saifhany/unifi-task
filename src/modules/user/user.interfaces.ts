import { SignUpDTO, SignInDTO } from '@/user/user.dtos'
import mongoose from 'mongoose'
import { Ok, Err, Result } from 'ts-results'

export interface IUserService {
  signup(dto: SignUpDTO): Promise<Result<IUserResult, string>>
  signin(dto: SignInDTO): Promise<Result<IUserResult, string>>
}

export interface IUserSchema extends mongoose.Document {
  name: string
  email: string
  password: string
}

export interface IUserResult {
  name: string
  email: string
  id: string
}
