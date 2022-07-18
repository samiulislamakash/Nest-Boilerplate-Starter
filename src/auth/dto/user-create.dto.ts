import { UserRole } from './../enum/auth.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class UserCreateDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: UserRole })
  @IsString()
  role: UserRole;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  status: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  designation: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  birthday: Date;

  @ApiProperty({})
  @IsString()
  organization: string;
}
