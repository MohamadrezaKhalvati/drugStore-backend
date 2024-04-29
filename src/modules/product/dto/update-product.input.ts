import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ProductStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator'

class UpdateProductData {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	name?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	description?: string

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsNumber()
	price?: number

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	imageUrl?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsEnum(ProductStatus)
	status?: ProductStatus
}

export class UpdateProductInput {
	@ApiProperty({ type: String })
	@IsString()
	@IsUUID()
	id: string

	@ApiProperty({ type: UpdateProductData })
	@Type(() => UpdateProductData)
	@ValidateNested()
	data: UpdateProductData
}
