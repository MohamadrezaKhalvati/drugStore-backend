import { ApiPropertyOptional } from '@nestjs/swagger'
import { ProductStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator'
import { PaginationData } from 'src/common/pagination.input'
import { SortByData } from 'src/common/sort-by.input'

class ReadProductData {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID()
	id?: string
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	name?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	description?: string

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsNumber()
	price?: number

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	imageUrl?: string

	@ApiPropertyOptional({ type: ProductStatus })
	@IsOptional()
	@IsEnum(ProductStatus)
	role?: ProductStatus
}

export class ReadProductInput {
	@ApiPropertyOptional({ type: ReadProductData })
	@IsOptional()
	@Type(() => ReadProductData)
	@ValidateNested()
	data?: ReadProductData

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
