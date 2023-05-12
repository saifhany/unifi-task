import {CreatetodoDTO, GettodoDTO, DeletetodoDTO, UpdatetodoDTO} from '@/modules/todo/todo.dtos'
import { get } from 'http'
import mongoose, { Schema } from 'mongoose'
import { Result } from 'ts-results'

export interface ITodoService {
  create(dto: CreatetodoDTO, userId: string): Promise<Result<ItodoSchema, string>>
  getOne(dto: GettodoDTO): Promise<Result<ItodoSchema, string>>
  update(dto: UpdatetodoDTO): Promise<Result<ItodoSchema, string>>
  delete(dto: DeletetodoDTO): Promise<Result<true, string>>
  getAll(userId: string): Promise<Result<ItodoSchema[], string>>
}

export interface ItodoSchema extends mongoose.Document {
  title: string
  description: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
  createdBy?: Schema.Types.ObjectId
}

export interface IUserResult {
  name: string
  email: string
  id: string
}
