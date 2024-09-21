import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { connectDatabase } from './helpers/database/prisma'
import { launchWebServer } from './helpers/server/express'

// ==========================================

// Set Environment Variables
const env = dotenv.config()
dotenvExpand.expand(env)

// ==========================================

async function main() {
  await connectDatabase()
  await launchWebServer()
}

// ==========================================

main()
