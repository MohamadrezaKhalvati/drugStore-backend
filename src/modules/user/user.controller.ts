import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateUserInput } from './dto/create-user.input'
import { DeleteUserInput } from './dto/delete-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Post('createUser')
	@ApiOperation({ operationId: 'createUser' })
	@ApiBody({ type: CreateUserInput })
	@ApiResponse({ status: 200 })
	async createUser(@Body() input: CreateUserInput) {}

	@Put('updateUser')
	@ApiOperation({ operationId: 'updateUser' })
	@ApiResponse({ status: 200 })
	async updateUser(@Body() input: UpdateUserInput) {
		return await this.userService.updateUser(input)
	}

	@Delete('deleteUser')
	@ApiOperation({ operationId: 'deleteUser' })
	@ApiResponse({ status: 200 })
	async deleteUser(@Body() input: DeleteUserInput) {
		return await this.userService.deleteUser(input)
	}

	@Get('readUser')
	@ApiOperation({ operationId: 'readUser' })
	@ApiResponse({ status: 200 })
	async readUser() {}

	@Get('me')
	@ApiOperation({ operationId: 'me' })
	@ApiResponse({ status: 200 })
	async me() {}
}
