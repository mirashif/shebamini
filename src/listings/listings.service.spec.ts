import { Test, TestingModule } from '@nestjs/testing';
import { ListingsService } from './listings.service';
import { PrismaService } from '../prisma.service';
import { GetListingsDto } from './dto/get-listings.dto';

describe('ListingsService', () => {
  let service: ListingsService;

  const mockPrismaService = {
    listing: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListingsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ListingsService>(ListingsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getListings', () => {
    const mockListings = [
      { id: '1', title: 'Service 1', createdAt: new Date() },
      { id: '2', title: 'Service 2', createdAt: new Date() },
    ];

    it('should return listings with default pagination', async () => {
      const query: GetListingsDto = {};
      mockPrismaService.listing.count.mockResolvedValue(2);
      mockPrismaService.listing.findMany.mockResolvedValue(mockListings);

      const result = await service.getListings(query);

      expect(result.data).toEqual(mockListings);
      expect(result.meta).toEqual({
        total: 2,
        limit: 10,
        page: 1,
        totalPages: 1,
      });
      expect(mockPrismaService.listing.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
      });
    });

    it('should handle custom pagination parameters', async () => {
      const query: GetListingsDto = { page: 2, limit: 5 };
      mockPrismaService.listing.count.mockResolvedValue(12);
      mockPrismaService.listing.findMany.mockResolvedValue(mockListings);

      const result = await service.getListings(query);

      expect(result.data).toEqual(mockListings);
      expect(result.meta).toEqual({
        total: 12,
        limit: 5,
        page: 2,
        totalPages: 3,
      });
      expect(mockPrismaService.listing.findMany).toHaveBeenCalledWith({
        skip: 5,
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
      });
    });

    it('should handle empty results', async () => {
      const query: GetListingsDto = {};
      mockPrismaService.listing.count.mockResolvedValue(0);
      mockPrismaService.listing.findMany.mockResolvedValue([]);

      const result = await service.getListings(query);

      expect(result.data).toEqual([]);
      expect(result.meta).toEqual({
        total: 0,
        limit: 10,
        page: 1,
        totalPages: 0,
      });
    });
  });
});
