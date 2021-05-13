import * as crypto from 'crypto';

const createPasswordHash = (password: string, salt: string): string =>
  crypto
    .createHash('sha256')
    .update(`${password}${salt}`, 'utf-8')
    .digest('hex');

const createPasswordSalt = (): string => crypto.randomBytes(20).toString('hex');

export { createPasswordHash, createPasswordSalt };
