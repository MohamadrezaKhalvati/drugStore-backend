import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateOrderInput } from './dto/create-order.input'
import { DeleteOrderInput } from './dto/delete-order.input'
import { ReadOrderInput } from './dto/read-order.input'
import { UpdateOrderInput } from './dto/update-order.input'

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async createOrder(input: CreateOrderInput) {}

	async readOrder(input: ReadOrderInput) {}

	async updateOrder(input: UpdateOrderInput) {}

	async deleteOrder(input: DeleteOrderInput) {}
}
