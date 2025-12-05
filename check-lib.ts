import prisma from './src/lib/prisma';

async function main() {
  try {
    console.log('Connecting to DB via src/lib/prisma...');
    await prisma.$connect();
    console.log('Successfully connected!');
    await prisma.$disconnect();
  } catch (e) {
    console.error('Connection failed:', e);
    process.exit(1);
  }
}

main();
