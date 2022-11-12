const { PrismaClient } = require('@prisma/client');
const mockedData = require('./mockedData.ts');

const prisma = new PrismaClient();

async function main() {
  // // eslint-disable-next-line no-restricted-syntax
  // for (const json of mockedData) {
  //   // eslint-disable-next-line no-await-in-loop
  //   await prisma.user.upsert(json);
  // }
  const postRequests = mockedData.map((json) => prisma.gateway.upsert(json));

  return Promise.all(postRequests);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
