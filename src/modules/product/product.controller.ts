import { Controller, Delete, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ProductService } from './product.service'

@ApiTags('Product')
@Controller('product')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Post('createProduct')
	@ApiOperation({ operationId: 'createProduct' })
	@ApiResponse({ status: 403, description: 'NOT IMPLEMENTED' })
	async createProduct() {}

	@Get('readProduct')
	@ApiOperation({ operationId: 'readProduct' })
	@ApiResponse({ status: 403, description: 'NOT IMPLEMENTED' })
	async readProduct() {}

	@Get('updateProduct')
	@ApiOperation({ operationId: 'updateProduct' })
	@ApiResponse({ status: 403, description: 'NOT IMPLEMENTED' })
	async updateProduct() {}

	@Delete('deleteProduct')
	@ApiOperation({ operationId: 'deleteProduct' })
	@ApiResponse({ status: 403, description: 'NOT IMPLEMENTED' })
	async deleteProduct() {}
}
