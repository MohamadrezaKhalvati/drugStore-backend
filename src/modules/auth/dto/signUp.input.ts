import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import {
	IsEmail,
	IsEnum,
	IsOptional,
	IsPhoneNumber,
	IsString,
} from 'class-validator'

export class SignUpInput {
	@ApiProperty()
	@IsString()
	username: string

	@ApiProperty()
	@IsString()
	password: string

	@ApiProperty()
	@IsString()
	confirmPassword: string

	@ApiProperty()
	@IsPhoneNumber('IR')
	phoneNumber: number

	@ApiProperty()
	@IsString()
	name: string

	@ApiProperty()
	@IsEmail()
	email: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsEnum(Role)
	role?: Role
}
