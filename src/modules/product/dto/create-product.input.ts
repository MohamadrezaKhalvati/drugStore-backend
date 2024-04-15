import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

class CreateProductData {}

export class CreateProductInput {
	@ApiProperty({ type: CreateProductData })
	@Type(() => CreateProductData)
	@ValidateNested()
	data: CreateProductData
}
