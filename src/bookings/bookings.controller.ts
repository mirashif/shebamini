import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingResponseDto } from './dto/booking-response.dto';
import { GetBookingDto } from './dto/get-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.createBooking(createBookingDto);
  }

  @Get(':id')
  async getBooking(
    @Param() params: GetBookingDto,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.getBooking(params.id);
  }
}
