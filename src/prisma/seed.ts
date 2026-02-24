import { PrismaClient } from '@prisma/client/extension';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
    await cleanUsers();

    const hashedPassword = await argon2.hash('12345678');
    await prisma.user.createMany({
        data: [
            {
                id: 0,
                username: 'admin',
                password: hashedPassword,
            },
        ],
    });

    console.log('Seed data created successfully!');
}

async function cleanUsers() {
    await prisma.user.deleteMany();
}

main()
    .catch((e) => {
        console.error('Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
