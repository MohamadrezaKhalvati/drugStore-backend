import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

class CreateCustomerData {}

export class CreateCustomerInput {
	@ApiProperty()
	@Type(() => CreateCustomerData)
	@ValidateNested()
	data: CreateCustomerData
}
