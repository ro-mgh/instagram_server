declare module Express {
  export interface Request {
    user: string;
  }
  export interface Response {
    user: string;
  }
}
