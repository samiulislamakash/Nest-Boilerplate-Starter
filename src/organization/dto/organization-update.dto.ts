import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class OrganizationUpdateDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  logo: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cover: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;
}
