import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { schema } from "./schema";

config({ path: ".env" }); // or .env.local

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("Environment variable DATABASE_URL is not set");
}

export const db = drizzle(databaseUrl, { schema });
