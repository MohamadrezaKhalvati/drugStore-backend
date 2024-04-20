import { ApiProperty } from '@nestjs/swagger'
import { ProductStatus } from '@prisma/client'
import { IsEnum, IsNumber, IsString } from 'class-validator'

export class CreateProductInput {
	@ApiProperty({ type: String })
	@IsString()
	name: string

	@ApiProperty({ type: String })
	@IsString()
	description: string

	@ApiProperty({ type: Number })
	@IsNumber()
	price: number

	@ApiProperty({ type: String })
	@IsString()
	imageUrl: string

	@ApiProperty()
	@IsEnum(ProductStatus)
	status: ProductStatus
}
