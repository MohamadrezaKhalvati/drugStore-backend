import { ApiPropertyOptional } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsBoolean,
	IsDateString,
	IsEnum,
	IsOptional,
	IsPhoneNumber,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator'
import { PaginationData } from 'src/common/pagination.input'
import { SortByData } from 'src/common/sort-by.input'

class ReadUserData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsUUID()
	id?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	name?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	username?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsPhoneNumber('IR')
	phoneNubmer?: number

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	email?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	password?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsBoolean()
	isActive?: boolean

	@ApiPropertyOptional()
	@IsOptional()
	@IsEnum(Role)
	role?: Role

	@ApiPropertyOptional()
	@IsOptional()
	@IsDateString()
	createDate?: Date

	@ApiPropertyOptional()
	@IsOptional()
	@IsDateString()
	updateDate?: Date
}

export class ReadUserInput {
	@ApiPropertyOptional({ type: ReadUserData })
	@IsOptional()
	@Type(() => ReadUserData)
	@ValidateNested()
	data?: ReadUserData

	@ApiPropertyOptional({ type: PaginationData })
	@IsOptional()
	@Type(() => PaginationData)
	@ValidateNested()
	pagination?: PaginationData

	@ApiPropertyOptional({ type: SortByData })
	@IsOptional()
	@Type(() => SortByData)
	@ValidateNested()
	sortyBy?: SortByData
}
