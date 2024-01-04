import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private configService: ConfigService) {}

  signAccessToken(): string {
    return sign(this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY')!, { expiresIn: '1d' });
  }

  verify(accessToken: string) {
    try {
      return verify(accessToken, this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY')!);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
