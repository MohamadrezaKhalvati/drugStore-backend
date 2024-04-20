import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'
import { PaginationData } from 'src/common/pagination.input'
import { SortByData } from 'src/common/sort-by.input'

class ReadBillingAddressData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	id?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	street?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	city?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	province?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	country?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	postalCode?: string
}

export class ReadBillingAddressInput {
	@ApiPropertyOptional({ type: ReadBillingAddressData })
	@IsOptional()
	@Type(() => ReadBillingAddressData)
	@ValidateNested()
	data?: ReadBillingAddressData

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
