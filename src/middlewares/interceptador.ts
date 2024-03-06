import { type NextApiRequest } from 'next'
import { CustomError } from '@/utils/customError'
import jwt from 'jsonwebtoken'

interface IToken {
  userId: string
}

async function authMiddleware (reqM: NextApiRequest): Promise<IToken | null> {
  const token = reqM.headers.authorization?.replace('Bearer ', '')

  if (token === undefined) {
    throw new CustomError('Token not informed!', 401)
  }

  try {
    const decoded = jwt.verify(token, process.env.KET_JWT_SECRET)
    reqM.idUser = decoded.id
    return {
      userId: decoded.id
    }
  } catch (error) {
    console.error(error)
    throw new CustomError('Token invalid!', 401)
  }
}

export { authMiddleware }
