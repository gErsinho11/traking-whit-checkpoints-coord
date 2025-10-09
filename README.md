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

## 🚀 Desplegado funcional en Render
## 📌 Base URL
```
https://<tu-servicio>.onrender.com/api/v1
```

---

## 🚦 Endpoints y Contratos

### 1. Healthcheck
**GET** `/healthz`  
Verifica que el servicio esté vivo.  

#### Response 200 OK
```json
{
  "status": "ok",
  "uptime": 12345
}
```

---

### 2. Autenticación

#### 2.1 Login  
**POST** `/auth/login`  

##### Request
```json
{
  "username": "admin",
  "password": "123456"
}
```

##### Response 200 OK
```json
{
  "access_token": "<jwt-token>"
}
```

⚠️ El `access_token` debe incluirse en los demás endpoints con el header:
```
Authorization: Bearer <jwt-token>
```

---

### 3. Shipments (Envíos)

#### 3.1 Listar envíos  
**GET** `/shipments`

##### Response 200 OK
```json
[
  {
    "id": "SHIP123",
    "origin": "Bogotá",
    "destination": "Medellín",
    "status": "in_transit"
  }
]
```

---

#### 3.2 Crear un envío  
**POST** `/shipments`

##### Request
```json
{
  "id": "SHIP125",
  "origin": "Barranquilla",
  "destination": "Cúcuta"
}
```

##### Response 201 Created
```json
{
  "id": "SHIP125",
  "origin": "Barranquilla",
  "destination": "Cúcuta",
  "status": "created"
}
```

---

### 4. Tracking (Seguimiento)

#### 4.1 Consultar tracking por ID  
**GET** `/tracking/:trackingId`

##### Ejemplo
```
GET /tracking/SHIP123
```

##### Response 200 OK
```json
{
  "trackingId": "SHIP123",
  "currentLocation": "Tunja",
  "status": "in_transit",
  "lastUpdated": "2025-10-02T10:30:00Z"
}
```

---

### 5. Checkpoints (Puntos de control)

#### 5.1 Crear checkpoint  
**POST** `/checkpoints`

##### Request
```json
{
  "trackingId": "SHIP123",
  "location": "Tunja",
  "timestamp": "2025-10-02T10:20:00Z",
  "status": "in_transit"
}
```

##### Response 201 Created
```json
{
  "id": "CHK001",
  "trackingId": "SHIP123",
  "location": "Tunja",
  "timestamp": "2025-10-02T10:20:00Z",
  "status": "in_transit"
}
```

---

#### 5.2 Listar checkpoints de un envío  
**GET** `/checkpoints?trackingId=SHIP123`

##### Response 200 OK
```json
[
  {
    "id": "CHK001",
    "trackingId": "SHIP123",
    "location": "Bogotá",
    "timestamp": "2025-10-01T08:00:00Z",
    "status": "created"
  },
  {
    "id": "CHK002",
    "trackingId": "SHIP123",
    "location": "Tunja",
    "timestamp": "2025-10-02T10:20:00Z",
    "status": "in_transit"
  }
]
```

---

## ✅ Resumen de Endpoints

| Método | Endpoint                      | Descripción |
|--------|-------------------------------|-------------|
| GET    | `/healthz`                    | Verifica el estado del servicio |
| POST   | `/auth/login`                 | Autenticación y obtención de JWT |
| GET    | `/shipments`                  | Listar envíos |
| POST   | `/shipments`                  | Crear un envío |
| GET    | `/tracking/:trackingId`       | Consultar tracking por ID |
| POST   | `/checkpoints`                | Crear checkpoint |
| GET    | `/checkpoints?trackingId=...` | Listar checkpoints de un envío |

---


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
