import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';
import { BookingStatus } from '@prisma/client';
import { CreateBookingDto } from './dto/create-booking.dto';

describe('BookingsService', () => {
  let service: BookingsService;

  const mockPrismaService = {
    listing: {
      findUnique: jest.fn(),
    },
    booking: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createBooking', () => {
    const mockCreateBookingDto: CreateBookingDto = {
      customerName: 'John Doe',
      phoneNumber: '+1234567890',
      listingId: 123,
    };

    const mockListing = {
      id: 123,
      title: 'Test Service',
    };

    const mockBooking = {
      id: 'booking-456',
      customerName: 'John Doe',
      phoneNumber: '+1234567890',
      listingId: 123,
      status: BookingStatus.PENDING,
    };

    it('should create a booking successfully', async () => {
      mockPrismaService.listing.findUnique.mockResolvedValue(mockListing);
      mockPrismaService.booking.create.mockResolvedValue(mockBooking);

      const result = await service.createBooking(mockCreateBookingDto);

      expect(result).toEqual(mockBooking);
      expect(mockPrismaService.listing.findUnique).toHaveBeenCalledWith({
        where: { id: mockCreateBookingDto.listingId },
      });
      expect(mockPrismaService.booking.create).toHaveBeenCalledWith({
        data: {
          customerName: mockCreateBookingDto.customerName,
          phoneNumber: mockCreateBookingDto.phoneNumber,
          listingId: mockCreateBookingDto.listingId,
          status: BookingStatus.PENDING,
        },
      });
    });

    it('should throw NotFoundException when listing does not exist', async () => {
      mockPrismaService.listing.findUnique.mockResolvedValue(null);

      await expect(service.createBooking(mockCreateBookingDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.booking.create).not.toHaveBeenCalled();
    });
  });

  describe('getBooking', () => {
    const mockBooking = {
      id: 'booking-456',
      customerName: 'John Doe',
      phoneNumber: '+1234567890',
      listingId: 123,
      status: BookingStatus.PENDING,
    };

    it('should return a booking when it exists', async () => {
      mockPrismaService.booking.findUnique.mockResolvedValue(mockBooking);

      const result = await service.getBooking('booking-456');

      expect(result).toEqual(mockBooking);
      expect(mockPrismaService.booking.findUnique).toHaveBeenCalledWith({
        where: { id: 'booking-456' },
      });
    });

    it('should throw NotFoundException when booking does not exist', async () => {
      mockPrismaService.booking.findUnique.mockResolvedValue(null);

      await expect(service.getBooking('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
