import { Controller, Get, Query } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { GetListingsDto, PaginatedResponse } from './dto/get-listings.dto';
import { ListingResponseDto } from './dto/listings-response.dto';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get()
  async getListings(
    @Query() query: GetListingsDto,
  ): Promise<PaginatedResponse<ListingResponseDto>> {
    return this.listingsService.getListings(query);
  }
}
