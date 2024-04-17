import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

class ReadCustomerData {}

export class ReadCustomerInput {
	@ApiPropertyOptional()
	@Type(() => ReadCustomerData)
	@ValidateNested()
	@IsOptional()
	data?: ReadCustomerData
}
