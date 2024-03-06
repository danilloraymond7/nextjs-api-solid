import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();
        console.log('Connected to the database');
        // Your code here
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    } finally {
        await prisma.$disconnect();
        console.log('Disconnected from the database');
    }
}

main().catch((error) => {
    console.error('An error occurred:', error);
});

export default prisma;