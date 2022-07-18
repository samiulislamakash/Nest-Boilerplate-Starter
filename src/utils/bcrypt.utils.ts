import * as bcrypt from 'bcrypt';
import { ENV } from '../env';
import { toNumber } from './util.function';

const SALT_ROUNDS: number = toNumber(ENV.bcryptSaltRound);

export async function hashString(pleanText: string): Promise<string> {
    return await bcrypt.hash(pleanText, SALT_ROUNDS);
}

export async function comparePassword(plainPassword: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashPassword);
}

export async function tempPasswordGenerator() {
    return Math.random().toString(36).slice(-10);
}
