import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class SortByData {
	@ApiPropertyOptional({ nullable: true })
	@IsOptional()
	@IsString()
	field?: string

	@ApiPropertyOptional({ nullable: true })
	@IsOptional()
	@IsBoolean()
	descending?: boolean

	convertToPrismaFilter?() {
		const result = { orderBy: {} }
		if (this.field)
			result.orderBy[this.field] = this.descending ? 'desc' : 'asc'

		return result
	}
}
