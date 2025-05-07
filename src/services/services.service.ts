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
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [total, services] = await Promise.all([
      this.prisma.service.count(),
      this.prisma.service.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: services,
      meta: {
        total,
        limit,
        page,
        totalPages,
      },
    };
  }
}
