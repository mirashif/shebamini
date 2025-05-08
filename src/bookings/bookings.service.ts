import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingResponseDto } from './dto/booking-response.dto';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingsService {
  async getBooking(id: string): Promise<BookingResponseDto> {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  constructor(private prisma: PrismaService) {}

  async createBooking(data: CreateBookingDto): Promise<BookingResponseDto> {
    // Check if service exists
    const service = await this.prisma.service.findUnique({
      where: { id: data.serviceId },
    });

    if (!service) {
      throw new NotFoundException(
        `Service with ID ${data.serviceId} not found`,
      );
    }

    // Create booking
    const booking = await this.prisma.booking.create({
      data: {
        customerName: data.customerName,
        phoneNumber: data.phoneNumber,
        serviceId: data.serviceId,
        status: BookingStatus.PENDING,
      },
    });

    return booking;
  }
}
