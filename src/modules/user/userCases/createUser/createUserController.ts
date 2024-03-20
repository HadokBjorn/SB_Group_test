import { container } from "tsyringe";
import { CreateUserService } from "./createUserService";
import { Request, Response } from "express";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";

class CreateUserController {
  async handle(request: Request, response: Response) : Promise<Response>{
    try {

      const { name, email, cpf, password, birth_day }: ICreateUserDto = request.body;

      const createUserService = container.resolve(CreateUserService);

      await createUserService.execute({
        name,
        email,
        cpf,
        password,
        birth_day
      });


      return response.status(201).send();
    } catch (error) {

      return response.status(500).json({ error: "Internal server error" });
    }
  }
}

export { CreateUserController };
