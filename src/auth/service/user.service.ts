import { User } from './../entity/user.entity';
import { CommonService } from 'src/common/service/common.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends CommonService<User> {
  constructor(
    @InjectRepository(User)
    public readonly _repository: Repository<User>,
  ) {
    super(_repository);
  }
}
