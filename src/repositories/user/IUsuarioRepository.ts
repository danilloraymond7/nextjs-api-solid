import { type User } from '@/entities/users/User'

export interface IUserRepository {
  getUserByEmail: (email: string) => Promise<User | null>
  saveDataOauth: (user: User) => Promise<boolean>
  updateDataOauth: (user: User) => Promise<boolean>
}
