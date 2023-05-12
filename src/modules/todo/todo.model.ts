import { Schema, model } from 'mongoose'
import {ItodoSchema} from '@/modules/todo/todo.interfaces'

const todoSchema = new Schema<ItodoSchema>({
      title: { type: String, required: true },
  description: { type: String, required: true},
  completed: { type: Boolean, required: true, default: false},
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now},
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Todo = model<ItodoSchema>('todo', todoSchema)

export default Todo
