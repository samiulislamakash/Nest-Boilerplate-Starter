import { UserRole } from './../enum/auth.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
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

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  designation: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  birthday: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  organization: string;
}
