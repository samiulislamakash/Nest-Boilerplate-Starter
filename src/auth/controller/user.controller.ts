import { CommonBulkDeleteDto } from './../../common/dto/common-bulk-delete.dto';
import { UserUpdateDto } from './../dto/user-update.dto';
import { CommonFilterDto } from './../../common/dto/common-filter.dto';
import { UserCreateDto } from './../dto/user-create.dto';
import { UserService } from './../service/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  commonResponse,
  listFilterResponse,
} from 'src/utils/output-message.utils';

@ApiTags('User')
@Controller('user')
export class UserController {
  entityRelation = {
    organization: true,
  };

  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() payload: UserCreateDto) {
    try {
      return commonResponse(
        true,
        'User Create Successful',
        await this.userService._create(payload, this.entityRelation),
      );
    } catch (e) {
      return commonResponse(false, 'Organization Create Error', e);
    }
  }

  @Get()
  async filter(@Query() param: CommonFilterDto) {
    try {
      let payload = await this.userService._filter(param);
      return listFilterResponse(
        true,
        'User Filter  Successful',
        payload.count,
        payload.page,
        payload.take,
        payload.data,
      );
    } catch (e) {
      return commonResponse(false, 'User Filter Error', e);
    }
  }

  @Post('bulkCreate')
  @ApiBody({ type: [UserCreateDto] })
  async bulkCreate(@Body() payload: UserCreateDto[]) {
    try {
      return commonResponse(
        true,
        'User Bulk Create Successful',
        await this.userService._bulkCreate(payload),
      );
    } catch (e) {
      return commonResponse(false, 'User Bulk Create Error', e);
    }
  }

  @Patch('bulkUpdate')
  @ApiBody({ type: [UserUpdateDto] })
  async bulkUpdate(@Body() payload: UserUpdateDto[]) {
    try {
      return commonResponse(
        true,
        'User Bulk Update Successful',
        await this.userService._bulkUpdate(payload),
      );
    } catch (e) {
      return commonResponse(false, 'User Bulk Update Error', e);
    }
  }

  @Delete('bulkDelete')
  async bulkDelete(@Body() payload: CommonBulkDeleteDto) {
    try {
      return commonResponse(
        true,
        'User Bulk Delete Successful',
        await this.userService._bulkDelete(payload),
      );
    } catch (e) {
      return commonResponse(false, 'User Bulk Delete Error', e);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return commonResponse(
        true,
        'User GetById Successful',
        await this.userService._getById(id),
      );
    } catch (e) {
      return commonResponse(false, 'User GetById Error', e);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UserUpdateDto) {
    try {
      return commonResponse(
        true,
        'User Update Successful',
        await this.userService._update(id, payload),
      );
    } catch (e) {
      return commonResponse(false, 'User Update Error', e);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return commonResponse(
        true,
        'User Delete Error',
        await this.userService._remove(id),
      );
    } catch (e) {
      return commonResponse(false, 'User Delete Error', e);
    }
  }
}
