import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

class CreateOrderData {}

export class CreateOrderInput {
	@ApiProperty({ type: CreateOrderData })
	@Type(() => CreateOrderData)
	@ValidateNested()
	data: CreateOrderData
}
