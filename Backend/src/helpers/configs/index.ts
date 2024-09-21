type ConfigsType = {
  DATABASE_URL: string
  API_URL: string
  PORT: string
  PROJECT_NAME: string
  CLIENT_URL: string
  ACCESS_TOKEN_SECRET: string
  REFRESH_TOKEN_SECRET: string
  JWT_ACCESS_TOKEN_EXPIRES: string
  JWT_REFRESH_TOKEN_EXPIRES: string
}

// ===========================================

export const configs: ConfigsType = {
  DATABASE_URL: process.env.DATABASE_URL || '',
  API_URL: process.env.API_URL || '',
  PORT: process.env.PORT || '3000',
  PROJECT_NAME: process.env.PROJECT_NAME || 'ski resort',
  CLIENT_URL: process.env.CLIENT_URL || '3000',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'secret',
  JWT_ACCESS_TOKEN_EXPIRES: process.env.JWT_ACCESS_TOKEN_EXPIRES || '24h',
  JWT_REFRESH_TOKEN_EXPIRES: process.env.JWT_REFRESH_TOKEN_EXPIRES || '12days',
}
