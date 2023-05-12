import { Router, Request, Response, NextFunction } from 'express'
import IController from '@/shared/interfaces/controller.interface'
import validationMiddleWare from '@/shared/middlewares/validation.middleware'
import { signUpSchema, signInSchema } from '@/user/user.validations'
import { IUserService } from '@/user/user.interfaces'
import HttpException from '@/shared/errors/errors.httpException'
import { signJWT } from '@/shared/utils/jwt.utils'

class UserController implements IController {
  public readonly path = '/users'
  public readonly router = Router()

  private userService: IUserService
  constructor(userService: IUserService) {
    this.userService = userService
    this.intializeRoutes()
  }

  private intializeRoutes(): void {
    this.router.post(`${this.path}/signup`, validationMiddleWare(signUpSchema), this.signup)
    this.router.post(`${this.path}/signin`, validationMiddleWare(signInSchema), this.signin)
  }

  private signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await this.userService.signup(req.body)

    if (data.ok) {
      res.status(200).json({
        message: 'signup successfully',
        data: data.val,
        token: signJWT(data.val.id),
      })
    } else next(new HttpException(data.val, 404))
  }

  private signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await this.userService.signin(req.body)

    if (data.ok) {
      res.status(200).json({
        data: data.val,
        token: signJWT(data.val.id),
      })
    } else next(new HttpException(data.val, 404))
  }

}

export default UserController
