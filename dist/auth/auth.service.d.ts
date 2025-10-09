import { JwtService } from '@nestjs/jwt';
type User = {
    id: string;
    username: string;
    passwordHash: string;
    roles: string[];
};
export declare class AuthService {
    private readonly jwt;
    private users;
    constructor(jwt: JwtService);
    validateUser(username: string, pass: string): Promise<Omit<User, 'passwordHash'> | null>;
    login(username: string, password: string): Promise<{
        access_token: string;
        token_type: string;
        expires_in: number;
    }>;
}
export {};
