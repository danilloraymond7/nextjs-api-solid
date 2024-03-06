'use server'
import { type NextApiRequest, type NextApiResponse } from 'next'
import type Oauth from './dto'
import { ServiceUser } from './services'
import { CustomError } from '@/utils/customError'

async function OAuth (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const token = await ServiceUser.execute(req.body as Oauth)
    res.status(200).json({ token })
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ message: error.message })
    } else {
      if (process.env.NODE_ENV === 'development') { console.error(error) } // log any unhandled errors
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default OAuth
