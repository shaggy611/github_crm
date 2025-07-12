#!/bin/sh

echo "⏳ Waiting for PostgreSQL to be ready..."
until nc -z "$POSTGRES_HOST" "$POSTGRES_PORT"; do
  sleep 1
done

echo "✅ PostgreSQL is up - running migrations..."

npm run migration:run

echo "🚀 Starting the application..."
npm run start:prod
