import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator'

export class CreateUserInput {
	@ApiProperty()
	@IsString()
	username: string

	@ApiProperty()
	@IsString()
	//   @IsHash()
	hashedPassword: string

	@ApiProperty()
	@IsPhoneNumber('IR')
	phoneNumber: number

	@ApiProperty()
	@IsString()
	name: string

	@ApiProperty()
	@IsString()
	email: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsEnum(Role)
	role?: Role
}
