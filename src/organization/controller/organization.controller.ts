import { OrganizationUpdateDto } from './../dto/organization-update.dto';
import { OrganizationCreateDto } from './../dto/organization-create.dto';
import { CommonFilterDto } from './../../common/dto/common-filter.dto';
import { CommonBulkDeleteDto } from './../../common/dto/common-bulk-delete.dto';
import { OrganizationService } from './../service/organization.service';
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
import {
  commonResponse,
  listFilterResponse,
} from 'src/utils/output-message.utils';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  async create(@Body() payload: OrganizationCreateDto) {
    try {
      return commonResponse(
        true,
        'Organization Create Successful',
        await this.organizationService._create(payload),
      );
    } catch (e) {
      return commonResponse(false, 'Organization Create Error', e);
    }
  }

  @Get()
  async filter(@Query() param: CommonFilterDto) {
    try {
      let payload = await this.organizationService._filter(param);
      return listFilterResponse(
        true,
        'Organization Filter  Successful',
        payload.count,
        payload.page,
        payload.take,
        payload.data,
      );
    } catch (e) {
      return commonResponse(false, 'Organization Filter Error', e);
    }
  }

  @Post('bulkCreate')
  @ApiBody({ type: [OrganizationCreateDto] })
  async bulkCreate(@Body() payload: OrganizationCreateDto[]) {
    try {
      return commonResponse(
        true,
        'Organization Bulk Create Successful',
        await this.organizationService._bulkCreate(payload),
      );
    } catch (e) {
      return commonResponse(false, 'Organization Bulk Create Error', e);
    }
  }

  @Patch('bulkUpdate')
  @ApiBody({ type: [OrganizationUpdateDto] })
  async bulkUpdate(@Body() payload: OrganizationUpdateDto[]) {
    try {
      return commonResponse(
        true,
        'Organization Bulk Update Successful',
        await this.organizationService._bulkUpdate(payload),
      );
    } catch (e) {
      return commonResponse(false, 'Organization Bulk Update Error', e);
    }
  }

  @Delete('bulkDelete')
  async bulkDelete(@Body() payload: CommonBulkDeleteDto) {
    try {
      return commonResponse(
        true,
        'Organization Bulk Delete Successful',
        await this.organizationService._bulkDelete(payload),
      );
    } catch (e) {
      return commonResponse(false, 'Organization Bulk Delete Error', e);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return commonResponse(
        true,
        'Organization GetById Successful',
        await this.organizationService._getById(id),
      );
    } catch (e) {
      return commonResponse(false, 'Organization GetById Error', e);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: OrganizationUpdateDto,
  ) {
    try {
      return commonResponse(
        true,
        'Organization Update Successful',
        await this.organizationService._update(id, payload),
      );
    } catch (e) {
      return commonResponse(false, 'Organization Update Error', e);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return commonResponse(
        true,
        'Organization Delete Error',
        await this.organizationService._remove(id),
      );
    } catch (e) {
      return commonResponse(false, 'Organization Delete Error', e);
    }
  }
}
