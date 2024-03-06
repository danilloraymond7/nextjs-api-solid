import { PrismaUserRepository } from '@/repositories/user/implementations/PrismaUserRepository'
import OauthUser from './useCase'

const dbUserRepository = new PrismaUserRepository()

const ServiceUser = new OauthUser(
  dbUserRepository
)

export { ServiceUser }
