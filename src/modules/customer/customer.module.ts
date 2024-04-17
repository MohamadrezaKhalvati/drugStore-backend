import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CustomerController } from './customer.controller'
import { CustomerService } from './customer.service'

@Module({
	providers: [CustomerService, PrismaService],
	controllers: [CustomerController],
})
export class CustomerModule {}
