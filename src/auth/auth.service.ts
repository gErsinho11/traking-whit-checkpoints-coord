import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

type User = { id: string; username: string; passwordHash: string; roles: string[] };

@Injectable()
export class AuthService {
  private users: User[] = [
    { id: '1', username: 'admin', passwordHash: bcrypt.hashSync('admin123', 8), roles: ['admin'] },
  ];

  constructor(private readonly jwt: JwtService) {}

  async validateUser(username: string, pass: string): Promise<Omit<User, 'passwordHash'> | null> {
    const user = this.users.find(u => u.username === username);
    if (!user) return null;
    const ok = await bcrypt.compare(pass, user.passwordHash);
    if (!ok) return null;
    const { passwordHash, ...rest } = user;
    return rest;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const access_token = await this.jwt.signAsync({ sub: user.id, username: user.username, roles: user.roles });
    return { access_token, token_type: 'Bearer', expires_in: 12 * 60 * 60 };
  }
}
