import IController from '@/shared/interfaces/controller.interface'
import UserController from '@/modules/user/user.controllers'
import UserService from '@/modules/user/user.services'
import todoController from '@/modules/todo/todo.controllers'
import TodoService from '@/modules/todo/todo.services'

export const controllers: IController[] = [
  new UserController(new UserService()),
  new todoController(new TodoService()),

]
