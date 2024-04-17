import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'

class DeleteProductData {
	@ApiProperty()
	@IsString()
	id: string
}

export class DeleteProductInput {
	@ApiProperty({ type: DeleteProductData })
	@Type(() => DeleteProductData)
	@ValidateNested()
	data: DeleteProductData
}
