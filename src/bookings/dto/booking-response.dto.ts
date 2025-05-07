import { BookingStatus } from '@prisma/client';

export class BookingResponseDto {
  id: string;
  customerName: string;
  phoneNumber: string;
  serviceId: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}
