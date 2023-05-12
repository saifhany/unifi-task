import { z } from 'zod'
import { signUpSchema, signInSchema } from '@/user/user.validations'

//DTOs Area
export type SignUpDTO = z.infer<typeof signUpSchema>
export type SignInDTO = z.infer<typeof signInSchema>
