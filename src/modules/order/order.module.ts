import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
	imports: [PrismaModule],
	providers: [OrderService],
	controllers: [OrderController],
})
export class OrderModule {}
