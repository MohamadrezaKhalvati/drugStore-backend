import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'

export class DeleteOrderInput {
	@ApiProperty()
	@IsString()
	@IsUUID()
	id: string
}
