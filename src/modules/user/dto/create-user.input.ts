import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator'

class CreateUserData {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  //   @IsHash()
  hashedPassword: string

  @ApiProperty()
  @IsString()
  email: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(Role)
  role?: Role
}

export class CreateUserInput {
  @ApiProperty({ type: CreateUserData })
  @Type(() => CreateUserData)
  @ValidateNested()
  data: CreateUserData
}
