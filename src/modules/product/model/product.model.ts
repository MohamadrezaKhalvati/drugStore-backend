import { ApiProperty } from '@nestjs/swagger'

export class ProductModel {
	@ApiProperty()
	id: string

	@ApiProperty()
	name: string

	@ApiProperty()
	price: number

	@ApiProperty()
	description: string

	@ApiProperty()
	imageUrl: string

	@ApiProperty()
	createDate: Date

	@ApiProperty()
	updateDate: Date

	@ApiProperty()
	status: ProductStatus
}

enum ProductStatus {
	Available = 'Available',
	UnAvailable = 'UnAvailable',
}
