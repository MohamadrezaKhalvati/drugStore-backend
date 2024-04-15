import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateUserInput } from './dto/create-user.input'

@Controller('user')
export class UserController {
	constructor() {}

	@Post('createUser')
	@ApiOperation({ operationId: 'createUser' })
	@ApiBody({ type: CreateUserInput })
	@ApiResponse({ status: 200 })
	async createUser(@Body() input: CreateUserInput) {}

	@Post('updateUser')
	@ApiOperation({ operationId: 'updateUser' })
	@ApiResponse({ status: 200 })
	async deleteUser() {}

	@Post('deleteUser')
	@ApiOperation({ operationId: 'deleteUser' })
	@ApiResponse({ status: 200 })
	async updateUser() {}

	@Get('readUser')
	@ApiOperation({ operationId: 'readUser' })
	@ApiResponse({ status: 200 })
	async readUser() {}
}
