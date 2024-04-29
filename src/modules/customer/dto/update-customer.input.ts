import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { PaymentMethod } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsEnum,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator'

class UpdateCustomerData {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	fullName?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsEnum(PaymentMethod)
	paymentMethod?: PaymentMethod
}

export class UpdateCustomerInput {
	@ApiProperty()
	@IsString()
	@IsUUID()
	id: string

	@ApiProperty()
	@Type(() => UpdateCustomerData)
	@ValidateNested()
	@IsOptional()
	data: UpdateCustomerData
}
