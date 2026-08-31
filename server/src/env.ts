import "dotenv/config";

const toInt = (value: string | undefined, fallback: number): number => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

/**
 * Central, validated view of the runtime configuration. Every secret and
 * environment-specific value is read here so the rest of the code never
 * touches `process.env` directly.
 */
export const env = {
  port: toInt(process.env.PORT, 3030),
  corsOrigin: process.env.CORS_ORIGIN ?? "*",
  db: {
    host: process.env.DB_HOST ?? "localhost",
    port: toInt(process.env.DB_PORT, 5432),
    username: process.env.DB_USERNAME ?? "postgres",
    password: process.env.DB_PASSWORD ?? "postgres",
    database: process.env.DB_NAME ?? "postgres",
  },
} as const;
