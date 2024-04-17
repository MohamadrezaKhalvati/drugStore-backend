import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {}
