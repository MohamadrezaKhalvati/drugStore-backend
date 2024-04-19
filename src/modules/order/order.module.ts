import { Module } from '@nestjs/common'
import { CustomerService } from '../customer/customer.service'
import { PrismaService } from '../prisma/prisma.service'
import { ProductService } from '../product/product.service'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
	providers: [OrderService, PrismaService, ProductService, CustomerService],
	controllers: [OrderController],
})
export class OrderModule {}
