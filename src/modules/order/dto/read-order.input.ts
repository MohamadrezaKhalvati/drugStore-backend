import { ApiPropertyOptional } from '@nestjs/swagger'
import { OrderStatus } from '@prisma/client'
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

class ReadOrderData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	@IsUUID()
	id?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	@IsUUID()
	customerId?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	notes?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsEnum(OrderStatus)
	status?: OrderStatus
}

export class ReadOrderInput {
	@ApiPropertyOptional({ type: ReadOrderData })
	@IsOptional()
	@Type(() => ReadOrderData)
	@ValidateNested()
	data?: ReadOrderData

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
