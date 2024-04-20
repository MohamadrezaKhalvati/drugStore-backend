import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import cleanDeep from 'clean-deep'
import { createPaginationResult } from 'src/common/pagination.input'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProductInput } from './dto/create-product.input'
import { DeleteProductInput } from './dto/delete-product.input'
import { ReadProductInput } from './dto/read-product.input'
import { UpdateProductInput } from './dto/update-product.input'

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}

	async createProduct(input: CreateProductInput) {
		const { name } = input

		await this.verifyIfProductNameNotDuplicated(name)

		const product = await this.prisma.product.create({
			data: {
				name: input.name,
				description: input.description,
				price: input.price,
				imageUrl: input.imageUrl,
				status: input.status,
			},
		})

		return product
	}

	async readProduct(input: ReadProductInput) {
		const rawWhere = input.data || {}
		let whereClause: Prisma.ProductWhereInput = {
			id: rawWhere.id,
			name: rawWhere.name,
			price: rawWhere.price,
			status: rawWhere.status,
			imageUrl: rawWhere.imageUrl,
		}

		whereClause = cleanDeep(whereClause)

		const count = this.prisma.product.count({ where: whereClause })
		const entity = this.prisma.product.findMany({
			where: whereClause,
			...input?.sortyBy?.convertToPrismaFilter(),
			...input?.pagination?.convertToPrismaFilter(),
		})
		return await createPaginationResult({ count, entity })
	}

	async readSpeceficProduct(id: string) {
		await this.verifyExistanceProduct(id)
		const product = await this.prisma.product.findFirst({
			where: { id: id },
		})

		return product
	}

	async updateProduct(input: UpdateProductInput) {}

	async deleteProduct(input: DeleteProductInput) {
		const { id } = input
		await this.verifyExistanceProduct(id)

		const deletedProduct = await this.prisma.product.delete({
			where: {
				id: id,
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
		if (!product)
			throw new NotFoundException(`product with this id ${id} not found`)
		return product
	}

	async verifyIfProductNameNotDuplicated(name: string) {
		const product = await this.prisma.product.findFirst({
			where: {
				name: name,
			},
		})

		if (!product) {
			throw new BadRequestException(
				`Product with this name: ${name} already exists.`,
			)
		}
		return product
	}
}
