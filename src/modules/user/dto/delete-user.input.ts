import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, IsUUID, ValidateNested } from 'class-validator'

class DeleteUserData {
	@ApiProperty({ type: String })
	@IsString()
	@IsUUID()
	id: string
}

export class DeleteUserInput {
	@ApiProperty()
	@Type(() => DeleteUserData)
	@ValidateNested()
	data: DeleteUserData
}
