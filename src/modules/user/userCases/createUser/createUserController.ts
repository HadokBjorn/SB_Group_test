import { container } from "tsyringe";
import { CreateUserService } from "./createUserService";
import { Request, Response } from "express";

class CreateUserController{
  async handle(request: Request, response: Response):Promise<Response>{
    const {name, email, cpf, password, birth_day} = request.body;
    const createUserService = container.resolve(CreateUserService);
    await createUserService.execute({
     name,
     email,
     cpf,
     password,
     birth_day
    });

    return response.status(201).send()
  }
}
