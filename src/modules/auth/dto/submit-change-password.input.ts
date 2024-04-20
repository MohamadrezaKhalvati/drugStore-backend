import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

class SubmitChangePasswordData {}

export class SubmitChangePasswordInput {
	@ApiProperty()
	@IsString()
	password: string

	@ApiProperty()
	@IsString()
	confirmPassword: string
}
