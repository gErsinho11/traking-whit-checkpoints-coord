import { Controller, Get } from '@nestjs/common';

@Controller('healthz') // 👈 ruta fuera de prefix
export class HealthController {
  @Get()
  check() {
    return { status: 'ok', ts: new Date().toISOString() };
  }
}

