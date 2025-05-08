import { IsInt, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @MinLength(3, { message: 'Customer name must be at least 3 characters long' })
  customerName: string;

  @IsPhoneNumber('BD', {
    message: 'Phone number must be a valid Bangladeshi phone number',
  })
  phoneNumber: string;

  @IsInt()
  listingId: number;
}
