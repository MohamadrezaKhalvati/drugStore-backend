import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { CustomerModule } from './modules/customer/customer.module'
import { OrderModule } from './modules/order/order.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { ProductModule } from './modules/product/product.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    ProductModule,
    OrderModule,
    CustomerModule,
  ],
})
export class AppModule {}
