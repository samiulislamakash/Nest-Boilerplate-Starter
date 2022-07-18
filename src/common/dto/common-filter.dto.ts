import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CommonFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  searchTerm: string;

  @ApiProperty({ required: false })
  @IsOptional()
  take: number;

  @ApiProperty({ required: false })
  @IsOptional()
  page: number;
}
