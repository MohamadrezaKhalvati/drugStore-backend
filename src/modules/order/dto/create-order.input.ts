import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { OrderStatus } from '@prisma/client'
import {
	ArrayNotEmpty,
	IsArray,
	IsEnum,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator'

export class CreateOrderInput {
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
