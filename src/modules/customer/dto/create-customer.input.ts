import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'

class CreateCustomerData {
	@ApiProperty()
	@IsString()
	name: string
}

export class CreateCustomerInput {
	@ApiProperty()
	@Type(() => CreateCustomerData)
	@ValidateNested()
	data: CreateCustomerData
}
