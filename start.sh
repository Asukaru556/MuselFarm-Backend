npx prisma migrate dev --name auto_migration --url="postgresql://postgres:root@postgres_db:5432/mussel_farm_db?schema=public"

node dist/src/main.js
