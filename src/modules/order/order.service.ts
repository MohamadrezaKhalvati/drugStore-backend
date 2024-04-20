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
import { ReadBillingAddressInput } from './dto/read-billing-address.input'
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
		await this.verifyIsBillingAddressExistance(input.billingAddressId)
		await this.customerService.verifyIfCustomerExistance(input.customerId)
		input.items.forEach(async productId => {
			await this.productService.verifyExistanceProduct(productId)
		})

		const order = await this.prisma.order.create({
			data: {
				customerId: input.customerId,
				notes: input.note,
				status: input.status,
				OrderProduct: {
					connect: input.items.map(productId => ({
						productId: productId,
						billingAddressId: input.billingAddressId,
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
		const { id } = input
		await this.verfiyIfOrderExistnce(id)

		const deleteOrderProduct = this.prisma.orderProduct.delete({
			where: { orderId: id },
			select: {
				billingAddressId: true,
			},
		})

		const deleteBillingAddress = this.prisma.billingAddress.delete({
			where: {
				id: (await deleteOrderProduct).billingAddressId,
			},
		})

		const deleteOrder = this.prisma.order.delete({
			where: { id },
			select: {},
		})

		const transaction = await this.prisma.$transaction([
			deleteBillingAddress,
			deleteOrderProduct,
			deleteOrder,
		])
		return transaction
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

	async readBillingAddress(input: ReadBillingAddressInput) {
		const rawWhere = input.data || {}

		let whereClause: Prisma.BillingAddressWhereInput = {
			id: rawWhere.id,
			city: rawWhere.city,
			country: rawWhere.country,
			postalCode: rawWhere.postalCode,
		}

		whereClause = cleanDeep(whereClause)

		const count = this.prisma.billingAddress.count({ where: whereClause })
		const entity = this.prisma.user.findMany({
			where: whereClause,
			...input?.sortyBy?.convertToPrismaFilter(),
			...input?.pagination?.convertToPrismaFilter(),
		})

		return await createPaginationResult({ count, entity })
	}

	async deleteBillingAddress(id: string) {
		const address = await this.prisma.billingAddress.delete({
			where: {
				id,
			},
		})

		if (!address) {
			throw new NotFoundException(
				`billing address with this id ${id} not found`,
			)
		}
	}
}
