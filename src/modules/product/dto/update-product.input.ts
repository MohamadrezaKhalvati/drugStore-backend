import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

class updateProductData {}

export class UpdateProductInput {
	@ApiProperty({ type: updateProductData })
	@Type(() => updateProductData)
	@ValidateNested()
	data: updateProductData
}
