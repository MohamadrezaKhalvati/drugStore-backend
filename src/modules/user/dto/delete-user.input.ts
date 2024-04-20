import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'

export class DeleteUserInput {
	@ApiProperty({ type: String })
	@IsString()
	@IsUUID()
	id: string
}
