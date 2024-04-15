import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login.input'
import { SignUpInput } from './dto/signUp.input'

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
}
