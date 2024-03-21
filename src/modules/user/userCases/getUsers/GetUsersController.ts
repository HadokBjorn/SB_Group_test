import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUsersService } from "./GetUsersService";
import IFilterSearchDTO from "../../dtos/IFilterSearchDto";

class GetUsersController{
  async handle(request:Request, response: Response):Promise<Response>{
    const {cpf,email,name} = request.query as IFilterSearchDTO;
    const getUsersService = container.resolve(GetUsersService);
    const users = await getUsersService.execute({cpf, email, name});
    return response.status(200).send(users);
  }
}
export {GetUsersController}
