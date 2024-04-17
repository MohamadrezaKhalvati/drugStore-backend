import { ApiProperty } from '@nestjs/swagger'
import { ProductStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator'

class CreateProductData {
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
	role: ProductStatus
}

export class CreateProductInput {
	@ApiProperty({ type: CreateProductData })
	@Type(() => CreateProductData)
	@ValidateNested()
	data: CreateProductData
}
