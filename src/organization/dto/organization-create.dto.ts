import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class OrganizationCreateDto {
  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({})
  @IsString()
  phone: string;

  @ApiProperty({})
  @IsString()
  @IsEmail()
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
