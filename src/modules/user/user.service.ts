import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserInput } from './dto/create-user.input'
@Injectable()
export class UserService {
  readonlySelectUser = {
    id: true,
    username: true,
    email: true,
    location: true,
    gender: true,
  }

  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async me() {}

  async createUser(input: CreateUserInput) {}

  async readUser() {}

  async updateUser() {}

  async deleteUser() {}

  async verifyIfUserExistance() {}

  hashingPassword() {}
}
