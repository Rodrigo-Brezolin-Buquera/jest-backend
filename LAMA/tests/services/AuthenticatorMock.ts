
export class AuthenticatorMock {
  public generateToken(input: AuthenticationData): string {
    return "token";
  }

  public getData(token: string): AuthenticationData {
    return {
      id: "payload.id",
      role: "payload.role",
    };
  }
}

interface AuthenticationData {
  id: string;
  role?: string;
}
