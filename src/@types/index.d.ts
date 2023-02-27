import { User } from "./data";

export interface AuthState {
  token?: string ;
  user?: User | null;
}
