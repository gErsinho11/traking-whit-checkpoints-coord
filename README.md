# traking-whit-checkpoints-coord

## ⚙️ Stack Tecnológico
- Node 18+, NestJS 10
- Clean Architecture (interfaces → application → domain → infrastructure)
- Seguridad JWT (login básico)
- Tests con Jest (unit y e2e con Supertest)
- Persistencia in-memory

## 🚀 Si se reuqiere ejecutar localmente
```bash
cp .env.example .env
npm i
npm run start:dev
# http://localhost:3000
```

Variables de entorno:
```
PORT=3000
JWT_SECRET=super-secret-change-me
```

## 🔐 Autenticación
- **POST** `/api/v1/auth/login` → `{ username, password }`
  - Usuario semilla: `admin / admin123`
  - Respuesta: `{ access_token, token_type: "Bearer" }`
- Usar `Authorization: Bearer <token>` para acceder a los endpoints del dominio.

## 📦 Endpoints (MVP)
- **POST** `/api/v1/checkpoints`
  - Cuerpo: `{ trackingId: string, status: ShipmentStatus, timestamp?: ISO, location?: string }`
  - Cabecera opcional: `Idempotency-Key: <uuid>`
  - Reglas:
    - Solo procesa checkpoints de **unidades registradas**.
    - Idempotencia: si llega el mismo `Idempotency-Key` se responde OK sin duplicar.
- **GET** `/api/v1/tracking/:trackingId` → historial + último estado.
- **GET** `/api/v1/shipments?status=IN_TRANSIT` → listar por estado (estado por defecto `CREATED`).

## 🧪 Tests
```bash
npm test         # unit
npm run test:e2e # integración
```

## 🧱 Resumen de la arquitectura - estructura dek código
- **domain**: entidades, VOs y **interfaces** de repositorio.
- **application**: **use cases** puros que dependen de las interfaces.
- **infrastructure**: adaptadores concretos (controllers, repos in-memory).
- **auth**: módulo de autenticación aislado.
- **common**: guard global JWT.

## 🛡️ Consideraciones de calidad
- Validaciones con `class-validator`.
- Idempotencia por header `Idempotency-Key`.
- Errores HTTP explícitos (`BadRequest`, `NotFound`, `Unauthorized`).
- Semillas mínimas para probar rápido (`TST-0001`, `TST-0002`).
