import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { PaginationData } from 'src/common/pagination.input'
import { SortByData } from 'src/common/sort-by.input'

class ReadOrderData {}

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
