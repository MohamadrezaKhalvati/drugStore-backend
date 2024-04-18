import { ApiProperty } from '@nestjs/swagger'
import { ContanctInfo, Order } from '@prisma/client'

export class CustomerModel {
	@ApiProperty()
	id: string

	@ApiProperty()
	name: string

	@ApiProperty()
	lastActivity: Date

	@ApiProperty()
	orderHistory: string

	@ApiProperty()
	paymentMethod: string

	@ApiProperty()
	createDate: Date

	@ApiProperty()
	updateDate: Date

	@ApiProperty()
	orderId: string

	@ApiProperty()
	medicalRecord: Order

	@ApiProperty()
	contanctInfoId: string

	@ApiProperty()
	contanctInfo: ContanctInfo
}
