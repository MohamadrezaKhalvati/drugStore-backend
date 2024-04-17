import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

class DeleteCustomerData {}

export class DeleteCustomerInput {
	@ApiProperty()
	@Type(() => DeleteCustomerData)
	@ValidateNested()
	data: DeleteCustomerData
}
