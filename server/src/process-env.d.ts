declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string,
    FRONTEND_URL:string,
    JWT_REFRESH_TOKEN_SECRET:string,
    JWT_AUTH_TOKEN_SECRET:string,
    // add more environment variables and their types here
  }
}
