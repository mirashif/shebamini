# shebamini

Tech Stack: TypeScript, Node.js, NestJS, Prisma, SQLite, Jest, Docker

## Assumptions

You should have pnpm@10.10.0, and node@22 installed.

## Setup & Running Instruction

- Install project dependencies using `pnpm i`
- Make `.env` from `.env.example`, values are already set in the example file
- Run the app using `pnpm start:dev`
- You should see console outputs coming from NestJS
- You can open Swagger documentation UI/JSON spec using the links below
- You can also view the database on the browser using `pnpm prisma studio` command
- If the database is empty, run `pnpm prisma db push` to sync the db schema and run `pnpm prisma db seed` to seed the db with listing data (which runs ./prisma/seed.ts script)

## API Documentation

- Swagger ui: [http://localhost:3000/swagger](http://localhost:3000/swagger)
- Swagger json: [http://localhost:3000/swagger/json](http://localhost:3000/swagger/json)

## How To Run Tests

You can run the unit tests using `pnpm test` command which will run all the jest tests described in \*.spec.ts files in the repo.

---

## Requirements

### Core Features

- [x] Service Listing API: A paginated API that returns a list of available services with name, category, price, and description.
- [x] Service Booking API: Customers can book a service with their name, phone number, and service ID.
- [x] Booking Status API: Customers can check the status of their booking using a unique booking ID.

### Unit Testing

- [x] Service listing
- [x] Booking creation
- [x] Booking status retrieval
