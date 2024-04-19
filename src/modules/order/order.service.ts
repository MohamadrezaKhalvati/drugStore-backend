import { Injectable, NotFoundException } from '@nestjs/common'
import { CustomerService } from '../customer/customer.service'
import { PrismaService } from '../prisma/prisma.service'
import { ProductService } from '../product/product.service'
import { CreateBillingAddressInput } from './dto/create-billingAddress.input'
import { CreateOrderInput } from './dto/create-order.input'
import { DeleteOrderInput } from './dto/delete-order.input'
import { ReadOrderInput } from './dto/read-order.input'
import { UpdateOrderInput } from './dto/update-order.input'

@Injectable()
export class OrderService {
	constructor(
		private prisma: PrismaService,
		private productService: ProductService,
		private customerService: CustomerService,
	) {}

	async createOrder(input: CreateOrderInput) {
		const { data } = input
		await this.verifyIsBillingAddressExistance(data.billingAddressId)
		await this.customerService.verifyIfCustomerExistance(data.customerId)
		data.items.forEach(async productId => {
			await this.productService.verifyExistanceProduct(productId)
		})

		const order = await this.prisma.order.create({
			data: {
				customerId: data.customerId,
				notes: data.note,
				status: data.status,
				OrderProduct: {
					connect: data.items.map(productId => ({
						productId: productId,
						billingAddressId: data.billingAddressId,
					})),
				},
			},
			include: {
				OrderProduct: true,
			},
		})
	}

	async readOrder(input: ReadOrderInput) {}

	async updateOrder(input: UpdateOrderInput) {}

	async deleteOrder(input: DeleteOrderInput) {}

	// ------------------ BILLING ADDRESS -------------------
	async createBillingAddress(input: CreateBillingAddressInput) {}

	private async verifyIsBillingAddressExistance(id: string) {
		const billingAdd = this.prisma.billingAddress.findFirst({
			where: {
				id,
			},
		})
		if (!billingAdd) {
			throw new NotFoundException(
				`billingAddress with this id ${id} not found`,
			)
		}
		return billingAdd
	}
}
