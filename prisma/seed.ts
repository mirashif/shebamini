import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    'Hair Care',
    'Massage',
    'Nail Care',
    'Skin Care',
    'Spa Treatment',
    'Beauty',
    'Wellness',
  ];
  const adjectives = [
    'Premium',
    'Deluxe',
    'Luxury',
    'Essential',
    'Advanced',
    'Classic',
    'Signature',
    'Expert',
  ];
  const treatments = [
    'Treatment',
    'Service',
    'Therapy',
    'Package',
    'Session',
    'Care',
  ];

  const services: Prisma.ServiceCreateInput[] = Array.from(
    { length: 100 },
    (_, index) => {
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const adjective =
        adjectives[Math.floor(Math.random() * adjectives.length)];
      const treatment =
        treatments[Math.floor(Math.random() * treatments.length)];

      return {
        name: `${adjective} ${category} ${treatment} ${index + 1}`,
        category,
        price: Math.floor(Math.random() * 150) + 25, // Random price between 25 and 175
        description: `Professional ${category.toLowerCase()} service with premium quality care and attention`,
      };
    },
  );

  for (const service of services) {
    await prisma.service.create({
      data: service,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
