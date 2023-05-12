import { Schema, model } from 'mongoose'
import { IUserSchema } from '@/user/user.interfaces'

const userSchema = new Schema<IUserSchema>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

const User = model<IUserSchema>('User', userSchema)

export default User
