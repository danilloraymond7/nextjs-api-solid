import { PrismaUserRepository } from '@/repositories/user/implementations/PrismaUserRepository'
import Account from './useCase'

const dbUserRepository = new PrismaUserRepository()

const ServiceUserAccount = new Account(
  dbUserRepository
)

export { ServiceUserAccount }
