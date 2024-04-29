import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import cleanDeep from 'clean-deep'
import { createPaginationResult } from 'src/common/pagination.input'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCustomerInput } from './dto/create-customer.input'
import { DeleteCustomerInput } from './dto/delete-customer.input'
import { ReadCustomerInput } from './dto/read-customer.input'
import { UpdateCustomerInput } from './dto/update-customer.input'

@Injectable()
export class CustomerService {
	constructor(private prisma: PrismaService) {}

	async createCustomer(input: CreateCustomerInput) {
		const { contactInfo } = input
		const customer = await this.prisma.customer.create({
			data: {
				fullName: input.fullName,
				paymentMethod: input.paymentMehod,
				Order: {
					connect: {
						id: input.orderId,
					},
				},
				contanctInfo: {
					create: {
						email: contactInfo.email,
						phoneNumber: contactInfo.phoneNumber,
					},
				},
			},
		})

		return customer
	}

	async readCustomer(input: ReadCustomerInput) {
		const { data, pagination, sortBy } = input

		const rawWhere = data || {}

		let whereClause: Prisma.CustomerWhereInput = {
			id: data.id,
			fullName: { mode: 'insensitive', contains: rawWhere.fullname },
			paymentMethod: data.paymentMethod,
			contanctInfoId: data.contanctInfoId,
		}

		whereClause = cleanDeep(whereClause)

		const count = this.prisma.customer.count({ where: whereClause })
		const entity = this.prisma.customer.findMany({
			where: whereClause,
			...sortBy?.convertToPrismaFilter(),
			...pagination?.convertToPrismaFilter(),
		})

		return await createPaginationResult({ count, entity })
	}

	async updateCustomer(input: UpdateCustomerInput) {
		const { data, id } = input
		const updatingCustomer = await this.prisma.customer.findUnique({
			where: { id: id },
		})

		const fullName =
			data.fullName?.toLowerCase() || updatingCustomer.fullName
		const paymentMehod =
			data.paymentMethod || updatingCustomer.paymentMethod

		const updatedCustomer = await this.prisma.customer.update({
			where: { id },
			data: {
				fullName: fullName,
				paymentMethod: paymentMehod,
			},
		})
		return updatedCustomer
	}

	async deleteCustomer(input: DeleteCustomerInput) {
		await this.verifyIfCustomerExistance(input.id)

		const deletedCustomer = await this.prisma.customer.delete({
			where: {
				id: input.id,
			},
			include: {
				contanctInfo: true,
				Order: true,
			},
		})
		return deletedCustomer
	}

	async verifyIfCustomerExistance(id: string) {
		const customer = await this.prisma.customer.findFirst({
			where: { id },
		})
		if (!customer) {
			throw new NotFoundException(`customer with this id ${id} not found`)
		}
	}
}
