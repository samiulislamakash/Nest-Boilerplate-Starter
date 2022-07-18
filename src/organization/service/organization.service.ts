import { CommonBulkDeleteDto } from './../../common/dto/common-bulk-delete.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/service/common.service';
import { Repository, DataSource, In } from 'typeorm';
import { Organization } from '../entity/organization.entity';

@Injectable()
export class OrganizationService extends CommonService<Organization> {
  constructor(
    @InjectRepository(Organization)
    public readonly _repository: Repository<Organization>,
    public readonly dataSource: DataSource,
  ) {
    super(_repository);
  }
}
