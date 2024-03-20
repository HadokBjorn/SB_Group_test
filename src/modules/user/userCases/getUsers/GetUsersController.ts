import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUsersService } from "./GetUsersService";

class GetUsersController{
  async handle(request:Request, response: Response):Promise<Response>{
    const getUsersService = container.resolve(GetUsersService);
    const users = await getUsersService.execute();
    return response.status(200).send(users);
  }
}
export {GetUsersController}
