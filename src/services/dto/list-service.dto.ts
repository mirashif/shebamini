import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ListServiceDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number = 10;
}

export class PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
