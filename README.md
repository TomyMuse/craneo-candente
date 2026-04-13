# Craneo Candente - Prototype (Next.js + Prisma + Vercel)

Prototipo funcional deployable para reservas online de salas de ensayo y grabacion.

## Stack

- Next.js App Router + TypeScript + Tailwind
- API Routes en `/api/*`
- Prisma ORM + Postgres gestionado
- Sesiones admin por cookie `httpOnly`
- Vitest (unit/integration) + Playwright (E2E)

## Estructura

- `src/app` -> UI + API handlers
- `src/lib` -> dominio, auth, validaciones, serializers
- `prisma` -> schema + seed
- `legacy` -> app anterior (Express + HTML) conservada como referencia

## Setup local

1. Instalar dependencias:

```bash
npm install
```

2. Crear entorno local desde `.env.example`:

```bash
copy .env.example .env
```

3. Configurar una `DATABASE_URL` valida de Postgres.

4. Generar cliente Prisma:

```bash
npm run db:generate
```

5. Aplicar esquema en DB:

```bash
npm run db:migrate
```

6. Seed inicial (4 salas + admin):

```bash
npm run db:seed
```

7. Correr app:

```bash
npm run dev
```

## Scripts

- `npm run dev` -> desarrollo
- `npm run build` -> build de produccion
- `npm run start` -> correr build
- `npm run lint` -> lint
- `npm test` -> unit + integration
- `npm run test:e2e` -> E2E con Playwright
- `npm run db:generate` -> prisma generate
- `npm run db:migrate` -> migraciones locales
- `npm run db:seed` -> datos semilla
- `npm run db:studio` -> Prisma Studio

## Contratos API

- `GET /api/rooms`
- `GET /api/availability`
- `POST /api/reservations`
- `POST /api/login`
- `POST /api/logout`
- `GET /api/admin/reservations?date=YYYY-MM-DD|month=YYYY-MM`
- `DELETE /api/reservations/:id`

## Seguridad admin

- Password hash con bcrypt
- Sesion persistida en `sessions` (DB)
- Cookie `httpOnly`, `secure` en produccion, `sameSite=lax`
- Middleware para proteger `/admin/*` (excepto `/admin/login`)

## GitHub flow recomendado

- Rama protegida: `main`
- Trabajo por feature branch: `feature/*`
- Merge solo via Pull Request con CI en verde
- Deploy preview automatico por PR en Vercel
- Deploy production automatico al merge en `main`

## Deploy en Vercel

1. Importar repo en Vercel.
2. Configurar variables en `Preview` y `Production`:
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - `ADMIN_SEED_USERNAME`
   - `ADMIN_SEED_PASSWORD_HASH`
3. Ejecutar migracion/seed en entorno conectado (CLI o job inicial).
4. Verificar:
   - Home carga
   - Reserva crea bloque de agenda
   - Admin protegido y operativo

## Nota

La version anterior se mantiene en `legacy/` para referencia y rollback funcional.