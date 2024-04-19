import { ApiProperty } from '@nestjs/swagger'
import { Customer } from '@prisma/client'
import { ProductModel } from 'src/modules/product/model/product.model'
import { BillingAddressModel } from '../dto/billingAddress..model'

export class OrderModel {
	@ApiProperty()
	id: string

	@ApiProperty()
	customer: Customer

	@ApiProperty()
	orderDate: Date

	@ApiProperty()
	billingAddress: BillingAddressModel

	@ApiProperty()
	note?: string

	@ApiProperty()
	items: ProductModel[]
}
