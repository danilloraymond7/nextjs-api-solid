import prisma from '@/database'
import { type User } from '@/entities/users/User'
import { type IUserRepository } from '@/repositories/user/IUsuarioRepository'

class PrismaUserRepository implements IUserRepository {
  async getUserByEmail (email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (user === null) {
      return null
    }

    return user
  }

  async saveDataOauth (userData: User): Promise<boolean> {
    const saved = await prisma.user.create({
      data: {
        ...userData
      }
    })

    if (saved === null) {
      return false
    }

    return true
  }

  async updateDataOauth (userData: User): Promise<boolean> {
    const updated = await prisma.user.updateMany({
      data: {
        ...userData
      },
      where: {
        id: userData.id
      }
    })
    if (updated === null) {
      return false
    }

    return true
  }
}

export { PrismaUserRepository }
