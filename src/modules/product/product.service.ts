import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProductInput } from './dto/create-product.input'
import { DeleteProductInput } from './dto/delete-product.input'
import { ReadProductInput } from './dto/read-product.input'
import { UpdateProductInput } from './dto/update-product.input'

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}

	async createProduct(input: CreateProductInput) {}

	async readProduct(input: ReadProductInput) {}

	async readSpeceficProduct() {}

	async updateProduct(input: UpdateProductInput) {}

	async deleteProduct(input: DeleteProductInput) {
		const { data } = input
		await this.verifyExistanceProduct(data.id)

		const deletedProduct = await this.prisma.product.delete({
			where: {
				id: data.id,
			},
		})
		return deletedProduct
	}

	async verifyExistanceProduct(id: string) {
		const product = await this.prisma.product.findFirst({
			where: {
				id,
			},
		})
		if (!product) throw new NotFoundException('product not found')
		return product
	}
}
