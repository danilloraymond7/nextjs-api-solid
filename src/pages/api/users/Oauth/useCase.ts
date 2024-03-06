import { type IUserRepository } from '@/repositories/user/IUsuarioRepository'
import type Oauth from './dto'
import jwt from 'jsonwebtoken'
import { User } from '@/entities/users/User'
import { CustomError } from '@/utils/customError'
import { validationDTO } from '@/utils/validationDTO'
import { validatiomEmail } from '@/utils/validationEmail'

export default class OauthUser {
  constructor (private readonly userRepository: IUserRepository) { }

  async execute (payload: Oauth): Promise<string> {
    if (!(await validationDTO(payload, ['name', 'email', 'avatar']))) {
      throw new CustomError('There are parameters not informed!', 400)
    }

    if (!validatiomEmail(payload.email)) {
      throw new CustomError('The email invalid!', 400)
    }

    const user = await this.userRepository.getUserByEmail(payload.email)

    let dataSetToken = ''
    if (user !== null) {
      await this.userRepository.updateDataOauth({
        name: payload.name,
        email: payload.email,
        avatar: payload.avatar,
        id: payload.id,
        updatedAt: new Date()
      })
      dataSetToken = {
        id: user?.id
      } as any
    } else {
      const payloadUser = new User(payload)
      dataSetToken = {
        id: payloadUser.id
      } as any
      await this.userRepository.saveDataOauth(payloadUser)
    }

    const secret = process.env.KET_JWT_SECRET // Chave secreta para gerar o token
    const token = jwt.sign(dataSetToken, secret) // Gera o token JWT

    return token
  }
}
