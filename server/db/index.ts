import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const globalForDb = globalThis as unknown as {
  conn?: ReturnType<typeof postgres>;
};

const conn =
  globalForDb.conn ??
  postgres(databaseUrl, {
    ssl: process.env.NODE_ENV === "production" ? undefined : true,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.conn = conn;
}

// Initialize Drizzle with schema
export const db = drizzle(conn, { schema });

