export {};

declare global {
  namespace Express {
   export interface Request {
      userId: any;
      anonId: any;
    }
  }
}

