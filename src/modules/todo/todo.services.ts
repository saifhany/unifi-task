import { ITodoService, ItodoSchema } from '@/modules/todo/todo.interfaces'
import {CreatetodoDTO, GettodoDTO, DeletetodoDTO, UpdatetodoDTO} from '@/modules/todo/todo.dtos'
import { Result, Ok, Err } from 'ts-results'
import Todo from '@/modules/todo/todo.model'

export default class TodoService implements ITodoService {
  create = async (dto: CreatetodoDTO, userId: string): Promise<Result<ItodoSchema, string>> => {
    const istodoAlreadyExist = await Todo.exists({ title: dto.title })

    //todo is already exist
    if (istodoAlreadyExist?._id) {
      return Err('todo already exists')
    }

    const todo: ItodoSchema = await Todo.create({ ...dto, createdBy: userId })

    if (todo._id) {
      return Ok(todo)
    } else return Err('Error in creating todo')
  }

  getOne = async (dto: GettodoDTO): Promise<Result<ItodoSchema, string>> => {
    const todo: ItodoSchema | null = await Todo.findOne({ _id: dto.todoId, createdBy: dto.userId }, { __v: false })

    if (todo == null) {
      return Err('todo not found')
    }
    return Ok(todo)
  }

  update = async (dto: UpdatetodoDTO): Promise<Result<ItodoSchema, string>> => {
    const todo: ItodoSchema | null = await Todo.findOneAndUpdate({ _id: dto.todoId, createdBy: dto.userId }, dto)

    if (todo == null) {
      return Err('todo not found')
    }

    // Get the new data
    //@ts-ignore
    const newtodo: ItodoSchema = await Todo.findOne({ _id: dto.todoId, createdBy: dto.userId }, { __v: false })


    return Ok(newtodo)
  }

  delete = async (dto: DeletetodoDTO): Promise<Result<true, string>> => {
    const todo: ItodoSchema | null = await Todo.findOneAndDelete({ _id: dto.todoId, createdBy: dto.userId })

    if (todo == null) {
      return Err('todo not found')
    }


    return Ok(true)
  }
  
  getAll = async (userId: string): Promise<Result<ItodoSchema[], string>> => {
    const todos: ItodoSchema[] = await Todo.find({ createdBy: userId }, { __v: false })

    return Ok(todos)
  }

}
