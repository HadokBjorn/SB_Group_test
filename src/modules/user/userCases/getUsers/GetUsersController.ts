import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUsersService } from "./GetUsersService";
import { ResponseUserDto } from "../../dtos/ResponseUserDto";

class GetUsersController{
  async handle(request:Request, response: Response):Promise<Response>{
    const getUsersService = container.resolve(GetUsersService);
    const users = await getUsersService.execute();
    const usersToSend = users?.map((user)=>{
      return new ResponseUserDto(user)
    });
    return response.status(200).send(usersToSend);
  }
}
export {GetUsersController}
