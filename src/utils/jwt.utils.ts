import * as jwt from 'jsonwebtoken';
import { ENV } from '../env';

const JWT_SECRET: string = ENV.jwtSecret;

export async function generateAccessToken(data: any) {
    return await jwt.sign({ data }, JWT_SECRET, { expiresIn: '1h' });
}

export async function generateRefreshToken(data: any) {
    return await jwt.sign({ data }, JWT_SECRET, { expiresIn: '15d' });
}

export async function decodeToken(token: string) {
    return await jwt.decode(token);
}
