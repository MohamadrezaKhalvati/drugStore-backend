import { ApiProperty } from '@nestjs/swagger'
import { BillingAddress, Customer, Product } from '@prisma/client'

export class OrderModel {
	@ApiProperty()
	id: string

	@ApiProperty()
	customer: Customer

	@ApiProperty()
	orderDate: Date

	@ApiProperty()
	billingAddress: BillingAddress

	@ApiProperty()
	note?: string

	@ApiProperty()
	items: Product[]
}
