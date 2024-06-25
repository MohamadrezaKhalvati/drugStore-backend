import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class LoginInput {
	@ApiProperty({ type: String })
	@IsString()
	@IsEmail()
	email: string

	@ApiProperty({ type: String })
	@IsString()
	password: string
}
