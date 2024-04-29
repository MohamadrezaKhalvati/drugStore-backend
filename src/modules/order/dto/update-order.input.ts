import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { OrderStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsEnum,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator'

class UpdateOrderData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsUUID()
	customerId?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsUUID()
	notes?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsEnum(OrderStatus)
	status: OrderStatus
}

export class UpdateOrderInput {
	@ApiProperty()
	@IsString()
	id: string

	@ApiProperty({ type: UpdateOrderData })
	@Type(() => UpdateOrderData)
	@ValidateNested()
	data: UpdateOrderData
}
