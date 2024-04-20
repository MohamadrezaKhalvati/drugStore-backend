import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IsLoggedIn } from '../auth/guards/is-logged-in.guard'
import { CreateBillingAddressInput } from './dto/create-billingAddress.input'
import { CreateOrderInput } from './dto/create-order.input'
import { DeleteOrderInput } from './dto/delete-order.input'
import { ReadBillingAddressInput } from './dto/read-billing-address.input'
import { ReadOrderInput } from './dto/read-order.input'
import { UpdateOrderInput } from './dto/update-order.input'
import { OrderModel } from './model/order.model'
import { OrderService } from './order.service'

@Controller('order')
@ApiTags('Order')
export class OrderController {
	constructor(private orderService: OrderService) {}

	@Post('createOrder')
	@ApiOperation({ operationId: 'createOrder' })
	@ApiBody({ type: CreateOrderInput })
	@ApiResponse({ status: 200, type: OrderModel })
	@UseGuards(IsLoggedIn)
	async createOrder(@Body() input: CreateOrderInput) {
		return await this.orderService.createOrder(input)
	}

	@Get('readOrder')
	@ApiOperation({ operationId: 'readOrder' })
	@ApiBody({ type: ReadOrderInput })
	@ApiResponse({ status: 200, type: OrderModel })
	@UseGuards(IsLoggedIn)
	async readOrder(@Body() input: ReadOrderInput) {
		return await this.orderService.readOrder(input)
	}

	@Get('updateOrder')
	@ApiOperation({ operationId: 'updateOrder' })
	@ApiBody({ type: UpdateOrderInput })
	@ApiResponse({ status: 200, type: OrderModel })
	@UseGuards(IsLoggedIn)
	async updateOrder(@Body() input: UpdateOrderInput) {
		return await this.orderService.updateOrder(input)
	}

	@Delete('deleteOrder')
	@ApiOperation({ operationId: 'deleteOrder' })
	@ApiBody({ type: DeleteOrderInput })
	@ApiResponse({ status: 200, type: OrderModel })
	async deleteOrder(@Body() input: DeleteOrderInput) {
		return await this.orderService.deleteOrder(input)
	}

	@Post('createBillingAddress')
	@ApiOperation({ operationId: 'createBillingAddress' })
	@ApiBody({ type: CreateBillingAddressInput })
	@ApiResponse({ status: 200 })
	async createBillingAddress(@Body() input: CreateBillingAddressInput) {
		return await this.orderService.createBillingAddress(input)
	}

	@Get('readBillingAddress')
	@ApiOperation({ operationId: 'createBillingAddress' })
	@ApiBody({ type: ReadBillingAddressInput })
	@ApiResponse({ status: 200 })
	async readBillingAddress(@Body() input: ReadBillingAddressInput) {
		return await this.readBillingAddress(input)
	}
}
