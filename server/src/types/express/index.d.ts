 interface userInterface {
  name?: string
  _id: string
  email?: string
  userId?: string
}

declare module Express {
  export interface Request {
    user?: userInterface
  }
}

