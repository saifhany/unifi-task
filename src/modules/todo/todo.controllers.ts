import { Router, Request, Response, NextFunction } from 'express'
import IController from '@/shared/interfaces/controller.interface'
import validationMiddleWare from '@/shared/middlewares/validation.middleware'
import {updatetodoSchema, createtodoSchema} from '@/modules/todo/todo.validations'
import { ITodoService} from '@/modules/todo/todo.interfaces'
import HttpException from '@/shared/errors/errors.httpException'
import { authenticationMiddleWare } from '@/shared/middlewares/authentication.middleware'

class todoController implements IController {
  public readonly path = '/todos'
  public readonly router = Router()

  private TodoService: ITodoService
  constructor(TodoService: ITodoService) {
    this.TodoService = TodoService
    this.intializeRoutes()
  }

  private intializeRoutes(): void {
    this.router.post(`${this.path}/`, authenticationMiddleWare, validationMiddleWare(createtodoSchema), this.create)
    this.router.get(`${this.path}/:id`, authenticationMiddleWare, this.getOne)
    this.router.patch(
      `${this.path}/:id`,
      authenticationMiddleWare,
      validationMiddleWare(updatetodoSchema),
      this.update
    )
    this.router.delete(`${this.path}/:id`, authenticationMiddleWare, this.delete)
  }

  private create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await this.TodoService.create(req.body, res.locals.userId)

    if (data.ok) {
      res.status(200).json({
        message: 'todo created',
        data: data.val,
      })
    } else next(new HttpException(data.val, 400))
  }

  private getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await this.TodoService.getOne({ todoId: req.params.id, userId: res.locals.userId })

    if (data.ok) {
      res.status(200).json({
        message: 'todo found',
        data: data.val,
      })
    } else next(new HttpException(data.val, 404))
  }

  private update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await this.TodoService.update({ todoId: req.params.id, userId: res.locals.userId, ...req.body })
    if (data.ok) {
      res.status(200).json({
        message: 'todo updated',
        data: data.val,
      })
    } else next(new HttpException(data.val, 404))
  }

  private delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await this.TodoService.delete({ todoId: req.params.id, userId: res.locals.userId })

    if (data.ok) {
      res.status(204).json()
    } else next(new HttpException(data.val, 404))
  }
}

export default todoController
