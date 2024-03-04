import { Pool } from 'pg';
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import * as schema from './schema';

const pool = new Pool({
    connectionString: "postgres://postgres:0000@localhost:5432/productsdb"
});

export const db = drizzle(pool, {schema});

async function main() {
    console.log("Migration started");
    await migrate(db, {migrationsFolder:"drizzle"});
    console.log("Migration successful !");
}

main().catch((err) => { 
    console.log(err);
    process.exit(0);
});

export default db;