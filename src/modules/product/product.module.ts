import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
	providers: [ProductService],
	controllers: [ProductController],
})
export class ProductModule {}
