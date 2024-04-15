import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login.input'
import { SendChangePasswordCodeInput } from './dto/send-change-password-code-input'
import { SignUpInput } from './dto/signUp.input'
import { SubmitChangePasswordInput } from './dto/submit-change-password.input'
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	@ApiOperation({ operationId: 'login' })
	@ApiBody({ type: LoginInput })
	@ApiResponse({ status: 200 })
	async login(@Body() input: LoginInput) {
		return await this.authService.login(input)
	}

	@Post('signUp')
	@ApiOperation({ operationId: 'signUp' })
	@ApiBody({ type: SignUpInput })
	@ApiResponse({ status: 200 })
	async signUp(@Body() input: SignUpInput) {
		return await this.authService.signUp(input)
	}

	@Post('sendChangePasswordCode')
	@ApiOperation({ operationId: 'sendChangePasswordCode' })
	@ApiBody({ type: SendChangePasswordCodeInput })
	@ApiResponse({ status: 403, description: 'NOT IMPLEMENTED' })
	async sendChangePasswordCode(@Body() input: SendChangePasswordCodeInput) {}

	@Post('submitChangePassword')
	@ApiOperation({ operationId: 'submitChangePassword' })
	@ApiBody({ type: SubmitChangePasswordInput })
	@ApiResponse({ status: 403, description: 'NOT IMPLEMENTED' })
	async submitChangePassword(@Body() input: SubmitChangePasswordInput) {}
}
