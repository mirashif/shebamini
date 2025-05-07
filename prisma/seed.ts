import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const services: Prisma.ServiceCreateInput[] = [
    {
      name: 'Basic Hair Cut',
      category: 'Hair Care',
      price: 25,
      description: 'Standard hair cutting service for all hair types',
    },
    {
      name: 'Deep Tissue Massage',
      category: 'Massage',
      price: 75,
      description: '60-minute deep tissue massage targeting muscle tension',
    },
    {
      name: 'Manicure',
      category: 'Nail Care',
      price: 30,
      description:
        'Basic manicure including nail shaping, cuticle care, and polish',
    },
    {
      name: 'Facial Treatment',
      category: 'Skin Care',
      price: 65,
      description: 'Customized facial treatment for all skin types',
    },
  ];

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
