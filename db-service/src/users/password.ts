import * as crypto from 'crypto';

const createPasswordHash = (password, salt) =>
  crypto
    .createHash('sha256')
    .update(`${password}${salt}`, 'utf-8')
    .digest('hex');

const createPasswordSalt = () => crypto.randomBytes(20).toString('hex');

export { createPasswordHash, createPasswordSalt };
