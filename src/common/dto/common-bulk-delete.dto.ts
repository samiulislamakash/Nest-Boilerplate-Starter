import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CommonBulkDeleteDto {
  @ApiProperty()
  @IsArray()
  ids: string[];
}
