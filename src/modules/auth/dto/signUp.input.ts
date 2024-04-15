import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsEmail,
	IsEnum,
	IsOptional,
	IsPhoneNumber,
	IsString,
	ValidateNested,
} from 'class-validator'

//TODO  : SIGN UP DATA IMPLEMENTATION
class SignUpData {
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

export class SignUpInput {
	@ApiProperty({ type: SignUpData })
	@Type(() => SignUpData)
	@ValidateNested()
	data: SignUpData
}
