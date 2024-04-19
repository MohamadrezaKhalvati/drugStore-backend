import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import cleanDeep from 'clean-deep'
import { createPaginationResult } from 'src/common/pagination.input'
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
		return order
	}

	async readOrder(input: ReadOrderInput) {
		const rawWhere = input.data || {}

		let whereClause: Prisma.OrderWhereInput = {
			id: rawWhere.id,
			customerId: rawWhere.customerId,
			status: rawWhere.status,
			notes: rawWhere.notes,
		}

		whereClause = cleanDeep(whereClause)

		const count = this.prisma.order.count({ where: whereClause })
		const entity = this.prisma.order.findMany({
			where: whereClause,
			...input?.sortyBy?.convertToPrismaFilter(),
			...input?.pagination?.convertToPrismaFilter(),
		})
		return await createPaginationResult({ count, entity })
	}

	async updateOrder(input: UpdateOrderInput) {}

	async deleteOrder(input: DeleteOrderInput) {
		const {
			data: { id },
		} = input
		await this.verfiyIfOrderExistnce(id)

		const deleteOrderProduct = await this.prisma.orderProduct.delete({
			where: { orderId: id },
		})

		const deleteOrder = await this.prisma.order.delete({
			where: { id },
		})

		const deleteBillingAddress = await this.prisma.billingAddress.delete({
			where: {
				id: deleteOrderProduct.billingAddressId,
			},
		})

		// const transaction = await this.prisma.$transaction([
		// 	deleteBillingAddress,
		// 	deleteOrderProduct,
		// 	deleteOrder,
		// ])

		// return transaction
	}

	async verfiyIfOrderExistnce(id: string) {
		const order = await this.prisma.order.findFirst({
			where: { id },
		})
		if (!order) {
			throw new NotFoundException(`Order with this id ${id} not found!`)
		}
		return order
	}

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
