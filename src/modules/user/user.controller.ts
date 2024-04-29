import { Body, Controller, Delete, Get, Put } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetUserId } from '../auth/decorator/get-user-id.decorator'
import { DeleteUserInput } from './dto/delete-user.input'
import { ReadUserInput } from './dto/read-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { UserService } from './user.service'
@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Put('updateUser')
	@ApiOperation({ operationId: 'updateUser' })
	@ApiResponse({ status: 200 })
	@ApiBody({ type: UpdateUserInput })
	async updateUser(
		@Body() input: UpdateUserInput,
		@GetUserId() requesterId: string,
	) {
		return await this.userService.updateUser(input, requesterId)
	}

	@Delete('deleteUser')
	@ApiOperation({ operationId: 'deleteUser' })
	@ApiResponse({ status: 200 })
	@ApiBody({ type: DeleteUserInput })
	async deleteUser(@Body() input: DeleteUserInput) {
		return await this.userService.deleteUser(input)
	}

	@Get('readUser')
	@ApiOperation({ operationId: 'readUser' })
	@ApiResponse({ status: 200 })
	@ApiBody({ type: ReadUserInput })
	async readUser(@Body() input: ReadUserInput) {
		return await this.userService.readUser(input)
	}

	@Get('me')
	@ApiOperation({ operationId: 'me' })
	@ApiResponse({ status: 200 })
	async me() {}
}
