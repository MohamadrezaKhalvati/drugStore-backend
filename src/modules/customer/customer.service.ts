import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCustomerInput } from './dto/create-customer.input'
import { DeleteCustomerInput } from './dto/delete-customer.input'
import { ReadCustomerInput } from './dto/read-customer.input'
import { UpdateCustomerInput } from './dto/update-customer.input'

@Injectable()
export class CustomerService {
	constructor(private prisma: PrismaService) {}

	async createCustomer(input: CreateCustomerInput) {
		const { data } = input
	}

	async createCustomerContanctInfo(input) {}

	async readCustomer(input: ReadCustomerInput) {}

	async updateCustomer(input: UpdateCustomerInput) {}

	async deleteCustomer(input: DeleteCustomerInput) {}
}
