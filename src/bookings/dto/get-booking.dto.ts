import { IsString, IsNotEmpty } from 'class-validator';

export class GetBookingDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
