import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCustomerInput } from './dto/create-customer.input'
import { DeleteCustomerInput } from './dto/delete-customer.input'
import { ReadCustomerInput } from './dto/read-customer.input'
import { UpdateCustomerInput } from './dto/update-customer.input'

@Injectable()
export class CustomerService {
	constructor(private prisma: PrismaService) {}

	async createCustomer(input: CreateCustomerInput) {}

	async readCustomer(input: ReadCustomerInput) {}

	async updateCustomer(input: UpdateCustomerInput) {}

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
