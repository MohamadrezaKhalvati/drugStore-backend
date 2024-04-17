import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateProductInput } from './dto/create-product.input'
import { DeleteProductInput } from './dto/delete-product.input'
import { ReadProductInput } from './dto/read-product.input'
import { UpdateProductInput } from './dto/update-product.input'
import { ProductService } from './product.service'

@ApiTags('Product')
@Controller('product')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Post('createProduct')
	@ApiOperation({ operationId: 'createProduct' })
	@ApiBody({ type: CreateProductInput })
	@ApiResponse({ status: 200 })
	async createProduct(@Body() input: CreateProductInput) {
		return await this.productService.createProduct(input)
	}

	@Get('readProduct')
	@ApiOperation({ operationId: 'readProduct' })
	@ApiBody({ type: ReadProductInput })
	@ApiResponse({ status: 200 })
	async readProduct(@Body() input: ReadProductInput) {
		return await this.productService.readProduct(input)
	}

	@Get('readSpeceficProduct:id')
	@ApiOperation({ operationId: 'readSpeceficProduct' })
	@ApiResponse({ status: 200 })
	async readSpeceficProduct(@Param() id: string) {
		return await this.productService.readSpeceficProduct(id)
	}

	@Put('updateProduct')
	@ApiOperation({ operationId: 'updateProduct' })
	@ApiBody({ type: UpdateProductInput })
	@ApiResponse({ status: 200 })
	async updateProduct(@Body() input: UpdateProductInput) {
		return await this.productService.updateProduct(input)
	}

	@Delete('deleteProduct')
	@ApiOperation({ operationId: 'deleteProduct' })
	@ApiBody({ type: DeleteProductInput })
	@ApiResponse({ status: 200 })
	async deleteProduct(@Body() input: DeleteProductInput) {
		return await this.productService.deleteProduct(input)
	}
}
