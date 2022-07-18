import { Organization } from 'src/organization/entity/organization.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationService } from './service/organization.service';
import { Module } from '@nestjs/common';
import { OrganizationController } from './controller/organization.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
