export class AuthError extends Error {
  constructor() {
    super("Erro na autenticação");
  }
}
