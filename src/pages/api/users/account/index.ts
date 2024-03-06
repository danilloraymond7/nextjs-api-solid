/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type NextApiRequest, type NextApiResponse } from 'next'
import type Account from './dto'
import { ServiceUserAccount } from './services'
import { CustomError } from '@/utils/customError'
import { authMiddleware } from '@/middlewares/interceptador'

async function AccountUser (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    await authMiddleware(req)
    const userId = req.idUser
    const account = await ServiceUserAccount.execute({ userId } as Account)

    res.status(200).json({ account })
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ message: error.message })
    } else {
      if (process.env.NODE_ENV === 'development') { console.error(error) } // log any unhandled errors
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default AccountUser
