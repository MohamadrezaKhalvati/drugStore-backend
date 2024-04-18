import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'

class UpdateOrderData {}

export class UpdateOrderInput {
	@ApiProperty()
	@IsString()
	id: string

	@ApiProperty({ type: UpdateOrderData })
	@Type(() => UpdateOrderData)
	@ValidateNested()
	data: UpdateOrderData
}
