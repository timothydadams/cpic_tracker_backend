/**
 * One-time script to backfill usernames for existing users.
 *
 * Usage:  node scripts/backfill-usernames.js
 *   --dry-run   Preview changes without writing (default)
 *   --apply     Actually update the database
 */
import { PrismaClient } from '../prisma/generated/prisma/index.js';
import { generateUsername } from '../server/utils/generateUsername.js';

const dryRun = !process.argv.includes('--apply');
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany({
        where: {
            OR: [
                { username: null },
                { username: '' },
            ],
        },
        select: { id: true, email: true, username: true },
    });

    console.log(`Found ${users.length} user(s) without a username.`);

    if (users.length === 0) {
        console.log('Nothing to do.');
        return;
    }

    if (dryRun) {
        console.log('Dry run — no changes will be written. Use --apply to update.\n');
    }

    for (const user of users) {
        const newUsername = generateUsername();
        console.log(`  ${user.email ?? user.id} → ${newUsername}`);

        if (!dryRun) {
            await prisma.user.update({
                where: { id: user.id },
                data: { username: newUsername },
            });
        }
    }

    console.log(dryRun ? '\nDone (dry run).' : '\nDone — usernames updated.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
