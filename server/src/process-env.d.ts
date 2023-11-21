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
    NODE_ENV: "PRODUCTION" | "DEVELOPMENT"

    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    GITHUB_CLIENT_ID: string
    GITHUB_CLIENT_SECRET: string
    LINKEDIN_CLIENT_ID: string
    LINKEDIN_CLIENT_SECRET: string

    // add more environment variables and their types here
  }
}
