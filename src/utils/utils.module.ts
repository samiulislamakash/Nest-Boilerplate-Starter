import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FileUploadController } from './file-update.controller';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [FileUploadController],
  providers: [],
})
export class UtilsModule {}
