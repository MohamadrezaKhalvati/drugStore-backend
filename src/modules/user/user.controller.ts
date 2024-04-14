import { Controller, Get, Post } from '@nestjs/common'

@Controller('user')
export class UserController {
  constructor() {}

  @Post('createUser')
  async createUser() {}

  @Post('updateUser')
  async deleteUser() {}

  @Post('updateUser')
  async updateUser() {}

  @Get('readUser')
  async readUser() {}
}
