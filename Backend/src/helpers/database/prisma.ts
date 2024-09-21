import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { PrismaClient } from '@prisma/client'
import { configs } from '../configs'
// -----------------------------------------------

// Set Environment Variables
const env = dotenv.config()
dotenvExpand.expand(env)

// -----------------------------------------------

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient
}

export const prisma: PrismaClient =
  prismaGlobal.prisma ||
  new PrismaClient({
    // log: ['query'],
    // log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })



export const connectDatabase = async () => {
  try {
    console.log(configs.DATABASE_URL)
    await prisma.$connect();
    console.dir('Connected to Database Successfully ! 🗄 ');
  } catch (error: any) {
    console.error('Cannot connect to database')
    console.error({ error })
  }
}
