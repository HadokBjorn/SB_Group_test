import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUsersService } from "./GetUsersService";
import { GetUserDto } from "../../dtos/GetUserDto";

class GetUsersController{
  async handle(request:Request, response: Response):Promise<Response>{
    const getUsersService = container.resolve(GetUsersService);
    const users = await getUsersService.execute();
    const usersToSend = users?.map((user)=>{
      return new GetUserDto(user)
    });
    return response.status(200).send(usersToSend);
  }
}
export {GetUsersController}
