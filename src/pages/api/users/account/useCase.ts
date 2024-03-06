import { type IUserRepository } from '@/repositories/user/IUsuarioRepository'
import type Account from './dto'

export default class AccountUser {
  constructor (private readonly userRepository: IUserRepository) { }

  async execute (payload: Account): Promise<string> {
    return payload.userId
  }
}
