import { type IUserRepository } from '@/repositories/user/IUsuarioRepository'
import type Oauth from './dto'
import jwt from 'jsonwebtoken'
import { User } from '@/entities/users/User'

export default class OauthUser {
  constructor (private readonly userRepository: IUserRepository) { }

  async execute (payload: Oauth): Promise<string> {
    const user = await this.userRepository.getUserByEmail(payload.email)
    if (user !== null && user?.id === undefined) {
      throw new Error('Usuário não encontrado')
    }
    let dataSetToken = ''
    if (user !== null) {
      await this.userRepository.updateDataOauth({
        name: payload.name,
        email: payload.email,
        avatar: payload.avatar,
        id: payload.id
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

    const token = jwt.sign(dataSetToken, 'sua_chave_secreta') // Gera o token JWT
    return token
  }
}
