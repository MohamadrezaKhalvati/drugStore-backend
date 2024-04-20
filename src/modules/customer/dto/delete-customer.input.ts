import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class DeleteCustomerInput {
	@ApiProperty()
	@IsString()
	id: string
}
