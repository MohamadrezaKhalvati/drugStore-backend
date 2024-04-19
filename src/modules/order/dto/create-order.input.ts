import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { OrderStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	ArrayNotEmpty,
	IsArray,
	IsEnum,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator'

class CreateOrderData {
	@ApiProperty()
	@IsString()
	@IsUUID()
	customerId: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	note?: string

	@ApiProperty()
	@IsArray()
	@ArrayNotEmpty()
	@IsUUID(undefined, { each: true })
	items: string[]

	@ApiPropertyOptional()
	@IsOptional()
	@IsEnum(OrderStatus)
	status: OrderStatus

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	billingAddressId?: string
}

export class CreateOrderInput {
	@ApiProperty({ type: CreateOrderData })
	@Type(() => CreateOrderData)
	@ValidateNested()
	data: CreateOrderData
}
