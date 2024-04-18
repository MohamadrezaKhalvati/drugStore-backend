import {
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IsLoggedIn } from '../auth/guards/is-logged-in.guard'
import { CustomerService } from './customer.service'
import { CreateCustomerInput } from './dto/create-customer.input'
import { DeleteCustomerInput } from './dto/delete-customer.input'
import { ReadCustomerInput } from './dto/read-customer.input'
import { UpdateCustomerInput } from './dto/update-customer.input'

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {
	constructor(private customerService: CustomerService) {}

	@Post('createCustomer')
	@ApiOperation({ operationId: 'createCustomer' })
	@ApiResponse({ status: 200 })
	@ApiBody({ type: CreateCustomerInput })
	@UseGuards(IsLoggedIn)
	async createCustomer(@Body() input: CreateCustomerInput) {
		return await this.customerService.createCustomer(input)
	}

	@Get('readCustomer')
	@ApiOperation({ operationId: 'readCustomer' })
	@ApiResponse({ status: 200 })
	@ApiBody({ type: ReadCustomerInput })
	@UseGuards(IsLoggedIn)
	async readCustomer(@Body() input: ReadCustomerInput) {
		return await this.customerService.readCustomer(input)
	}

	@Put('updateCustomer')
	@ApiOperation({ operationId: 'updateCustomer' })
	@ApiResponse({ status: 200 })
	@ApiBody({ type: UpdateCustomerInput })
	@UseGuards(IsLoggedIn)
	async updateCustomer(@Body() input: UpdateCustomerInput) {
		return await this.customerService.updateCustomer(input)
	}

	@Delete('deleteCustomer')
	@ApiOperation({ operationId: 'deleteCustomer' })
	@ApiResponse({ status: 200 })
	@ApiBody({ type: DeleteCustomerInput })
	@UseGuards(IsLoggedIn)
	async deleteCustomer(@Body() input: DeleteCustomerInput) {
		return await this.customerService.deleteCustomer(input)
	}
}
