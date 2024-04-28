import { ApiPropertyOptional } from '@nestjs/swagger'
import { PaymentMethod } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsEnum,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator'
import { PaginationData } from 'src/common/pagination.input'
import { SortByData } from 'src/common/sort-by.input'

class ReadCustomerData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsUUID()
	id?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	fullname?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsEnum(PaymentMethod)
	paymentMethod?: PaymentMethod

	@ApiPropertyOptional()
	@IsOptional()
	@IsUUID()
	contanctInfoId?: string
}

export class ReadCustomerInput {
	@ApiPropertyOptional()
	@Type(() => ReadCustomerData)
	@ValidateNested()
	@IsOptional()
	data?: ReadCustomerData

	@ApiPropertyOptional()
	@Type(() => PaginationData)
	@ValidateNested()
	@IsOptional()
	pagination?: PaginationData

	@ApiPropertyOptional()
	@Type(() => SortByData)
	@ValidateNested()
	@IsOptional()
	sortBy?: SortByData
}
