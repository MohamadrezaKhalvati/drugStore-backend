import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'

class UpdateUserData {}

export class UpdateUserInput {
	@ApiProperty()
	@IsString()
	id: string

	@ApiProperty({ type: UpdateUserData })
	@Type(() => UpdateUserData)
	@ValidateNested()
	data: UpdateUserData
}
