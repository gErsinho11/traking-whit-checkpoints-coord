import { Controller, Get } from '@nestjs/common';

@Controller('healthz')
export class HealthController {
  @Get('healthz')
  check() {
    return { status: 'ok', ts: new Date().toISOString() };
  }
}
