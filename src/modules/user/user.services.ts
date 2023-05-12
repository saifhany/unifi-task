import { IUserService, IUserSchema, IUserResult } from '@/user/user.interfaces'
import { SignUpDTO, SignInDTO } from '@/user/user.dtos'
import User from '@/user/user.model'
import { hashPassword, verifyPassword } from '@/user/user.utils'
import { Ok, Err, Result } from 'ts-results'
import { buildUserResult } from '@/user/user.utils'
import crypto from 'crypto'

export default class UserService implements IUserService {
  signup = async (dto: SignUpDTO): Promise<Result<IUserResult, string>> => {
    const isUserAlreadyExist = await User.exists({ email: dto.email })

    if (isUserAlreadyExist?._id) {
      return Err('User already exists')
    }


    // hash password
    const hashedPassword = await hashPassword(dto.password)

    //change dto's password to hashedPassword
    dto.password = hashedPassword

    //Presist the new user to the database
    const pin = crypto.randomBytes(4).toString('hex')
    const newUserCreated: IUserSchema = await User.create({ ...dto, pin })

 
    //Build the suitable response format
    const userResult: IUserResult = buildUserResult(newUserCreated)

    return Ok(userResult)
  }

  signin = async (dto: SignInDTO): Promise<Result<IUserResult, string>> => {
    //Find the user in the database
    const user: IUserSchema | null = await User.findOne({ email: dto.email }, { __v: false })

    // return Err if the user is not found
    if (user === null) {
      return Err('user not found')
    }

    //compare passwords
    const isPasswordsMatch = await verifyPassword(dto.password, user.password)

    //if password don't matche return Err
    if (isPasswordsMatch === false) {
      return Err('user not found or password is incorrect')
    }

 

    //Build the suitable response format
    const userResult: IUserResult = buildUserResult(user)
    return Ok(userResult)
  }

}
