import { Controller, Delete, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Post('createProduct')
	@ApiOperation({ operationId: 'createProduct' })
	@ApiResponse({ status: 200 })
	async createProduct() {}

	@Get('readProduct')
	@ApiOperation({ operationId: 'readProduct' })
	@ApiResponse({ status: 200 })
	async readProduct() {}

	@Get('updateProduct')
	@ApiOperation({ operationId: 'updateProduct' })
	@ApiResponse({ status: 200 })
	async updateProduct() {}

	@Delete('deleteProduct')
	@ApiOperation({ operationId: 'deleteProduct' })
	@ApiResponse({ status: 200 })
	async deleteProduct() {}
}
