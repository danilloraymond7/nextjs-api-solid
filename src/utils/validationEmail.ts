/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { z } from 'zod'

const EmailSchema = z.string().email()

export const validatiomEmail = (email: string) => {
  try {
    EmailSchema.parse(email)
    return true
  } catch (error) {
    return false
  }
}
