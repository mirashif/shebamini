import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingsModule } from './listings/listings.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [ListingsModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
