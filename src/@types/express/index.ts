declare namespace Express {
  export interface Request {
    user: {
      name: string,
      email: string,
      cpf: string,
      password: string,
      birth_day: Date
    };
  }
}
