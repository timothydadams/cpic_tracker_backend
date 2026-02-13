import { randomBytes } from 'node:crypto';

export function generateUsername() {
    return `user_${randomBytes(4).toString('hex')}`;
}
