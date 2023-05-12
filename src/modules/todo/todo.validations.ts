import { z } from 'zod'

// Schemas Area
export const createtodoSchema = z.object({
  title: z
    .string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    })
    .min(1, { message: 'title can not be empty string' }),

  description : z.string({
    required_error: 'description is required',
    invalid_type_error: 'description must be a string',
  }),

   completed: z.boolean().optional(),

   createdAt: z.date().optional(),

    createdBy: z.string().optional(),



 
})

export const updatetodoSchema = createtodoSchema.deepPartial()
