import { Controller, Get, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ListServiceDto, PaginatedResponse } from './dto/list-service.dto';
import { ServiceResponseDto } from './dto/service-response.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async listServices(
    @Query() query: ListServiceDto,
  ): Promise<PaginatedResponse<ServiceResponseDto>> {
    return this.servicesService.listServices(query);
  }
}
