import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ListServiceDto, PaginatedResponse } from './dto/list-service.dto';
import { ServiceResponseDto } from './dto/service-response.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async listServices(
    query: ListServiceDto,
  ): Promise<PaginatedResponse<ServiceResponseDto>> {
    const { page = 1, pageSize = 10 } = query;
    const skip = (page - 1) * pageSize;

    const [total, services] = await Promise.all([
      this.prisma.service.count(),
      this.prisma.service.findMany({
        skip,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      data: services,
      meta: {
        total,
        page,
        pageSize,
        totalPages,
      },
    };
  }
}
