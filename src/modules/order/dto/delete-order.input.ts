import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, IsUUID, ValidateNested } from 'class-validator'

class DeleteOrderData {
	@ApiProperty()
	@IsString()
	@IsUUID()
	id: string
}

export class DeleteOrderInput {
	@ApiProperty({ type: DeleteOrderData })
	@Type(() => DeleteOrderData)
	@ValidateNested()
	data: DeleteOrderData
}
