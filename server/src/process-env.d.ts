declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: number
    FRONTEND_URL: string
    JWT_REFRESH_TOKEN_SECRET: string
    JWT_AUTH_TOKEN_SECRET: string
    NODEMAILER_EMAIL: string
    NODEMAILER_EMAIL_PASSWORD: string
    CLOUDINARY_CLOUD_NAME: string
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRET: string
    NODE_ENV:"PRODUCTION"|"DEVELOPMENT"
    // add more environment variables and their types here
  }
}
