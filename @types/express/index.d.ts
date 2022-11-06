import { AuthToken } from 'src/v1/models/entities/authToken';

declare global {
  namespace Express {
    export interface Request {
      authToken: AuthToken;
    }
  }
}
