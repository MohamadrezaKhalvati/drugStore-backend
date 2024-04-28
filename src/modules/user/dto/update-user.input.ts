import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsBoolean,
	IsEmail,
	IsEnum,
	IsOptional,
	IsPhoneNumber,
	IsString,
	ValidateNested,
} from 'class-validator'

class UpdateUserData {
	@ApiPropertyOptional({ nullable: true })
	@IsOptional()
	@IsString()
	username?: string

	@ApiPropertyOptional({ nullable: true })
	@IsOptional()
	@IsString()
	name?: string

	@ApiPropertyOptional({ nullable: true })
	@IsOptional()
	@IsEmail()
	email?: string

	@ApiPropertyOptional({ nullable: true })
	@IsOptional()
	@IsEnum(Role)
	role?: Role

	@ApiPropertyOptional({ nullable: true })
	@IsOptional()
	@IsBoolean()
	isActive?: boolean

	@ApiPropertyOptional({ nullable: true })
	@IsOptional()
	@IsPhoneNumber('IR')
	@IsString()
	phoneNumber?: string
}

export class UpdateUserInput {
	@ApiProperty()
	@IsString()
	id: string

	@ApiProperty({ type: UpdateUserData })
	@Type(() => UpdateUserData)
	@ValidateNested()
	data: UpdateUserData
}
