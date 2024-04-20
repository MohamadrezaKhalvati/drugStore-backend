import { ApiProperty } from '@nestjs/swagger'
import { Order } from '@prisma/client'

export class BillingAddressModel {
	@ApiProperty()
	id: string

	@ApiProperty()
	street: string

	@ApiProperty()
	city: string

	@ApiProperty()
	Province: string

	@ApiProperty()
	PostalCode: string

	@ApiProperty()
	Country: string

	@ApiProperty()
	order: Order
}
