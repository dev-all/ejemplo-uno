export class LoginRequest {
  username: string;
  password: string;
  database?: string;
  esAutomatico: boolean;

  constructor(init?: Partial<LoginRequest>) {
    Object.assign(this, init);
  }
}
