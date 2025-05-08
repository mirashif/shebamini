import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GetListingsDto, PaginatedResponse } from './dto/get-listings.dto';
import { ListingResponseDto } from './dto/listings-response.dto';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async getListings(
    query: GetListingsDto,
  ): Promise<PaginatedResponse<ListingResponseDto>> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [total, listings] = await Promise.all([
      this.prisma.listing.count(),
      this.prisma.listing.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: listings,
      meta: {
        total,
        limit,
        page,
        totalPages,
      },
    };
  }
}
