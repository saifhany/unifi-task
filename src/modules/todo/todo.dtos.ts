import { z } from 'zod'
import {updatetodoSchema, createtodoSchema} from '@/modules/todo/todo.validations'
//DTOs Area
export type CreatetodoDTO = z.infer<typeof createtodoSchema>
export type GettodoDTO = {
  userId: string
  todoId: string
}
export type DeletetodoDTO = GettodoDTO

export type UpdatetodoDTO = z.infer<typeof updatetodoSchema> & GettodoDTO
