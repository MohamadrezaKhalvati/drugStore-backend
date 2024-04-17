import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'

class UpdateCustomerData {}

export class UpdateCustomerInput {
	@ApiProperty()
	@IsString()
	@IsUUID()
	id: string

	@ApiProperty()
	@Type(() => UpdateCustomerData)
	@ValidateNested()
	@IsOptional()
	data: UpdateCustomerData
}
