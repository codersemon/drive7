import 'dotenv/config'

import { Client } from 'pg'

/**
 * Drops and recreates the `public` schema. Development helper — it destroys
 * every row in the database, so it refuses to run unless CONFIRM_DB_RESET=yes.
 */
const run = async () => {
  if (process.env.CONFIRM_DB_RESET !== 'yes') {
    console.error('Refusing to reset. Re-run with CONFIRM_DB_RESET=yes to confirm.')
    process.exit(1)
  }

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    console.error('DATABASE_URL is not set.')
    process.exit(1)
  }

  const client = new Client({ connectionString })
  await client.connect()
  await client.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;')
  await client.end()
  console.log('Database schema reset.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
