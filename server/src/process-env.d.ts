declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: number
    FRONTEND_URL: string
    JWT_REFRESH_TOKEN_SECRET: string
    JWT_AUTH_TOKEN_SECRET: string
    NODEMAILER_EMAIL: string
    NODEMAILER_EMAIL_PASSWORD: string
    // add more environment variables and their types here
  }
}
