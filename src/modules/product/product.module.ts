import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
	providers: [ProductService, PrismaService],
	controllers: [ProductController],
})
export class ProductModule {}
