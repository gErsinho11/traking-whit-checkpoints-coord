import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('E2E', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    const res = await request(app.getHttpServer()).post('/api/v1/auth/login').send({ username: 'admin', password: 'admin123' });
    token = res.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /api/v1/checkpoints -> creates checkpoint', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/checkpoints')
      .set('Authorization', `Bearer ${token}`)
      .set('Idempotency-Key', 'e2e-1')
      .send({ trackingId: 'TST-0001', status: 'PICKED_UP' });
    expect(res.status).toBe(201);
    expect(res.body.ok).toBe(true);
  });

  it('GET /api/v1/tracking/:id -> returns history', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/tracking/TST-0001')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.trackingId).toBe('TST-0001');
  });
});
