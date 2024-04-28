import { ApiProperty } from '@nestjs/swagger'
import { PaymentMethod } from '@prisma/client'
import { IsEnum, IsString, IsUUID } from 'class-validator'
import { CreateContactInput } from './create-contact-info.input'

export class CreateCustomerInput {
	@ApiProperty()
	@IsString()
	fullName: string

	@ApiProperty()
	@IsEnum(PaymentMethod)
	paymentMehod: PaymentMethod

	@ApiProperty()
	contactInfo: CreateContactInput

	@ApiProperty()
	@IsString()
	@IsUUID()
	orderId: string
}
