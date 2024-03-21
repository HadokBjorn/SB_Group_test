import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUsersService } from "./GetUsersService";
import { ResponseUserDto } from "../../dtos/ResponseUserDto";
import IFilterSearchDTO from "../../dtos/IFilterSearchDto";

class GetUsersController{
  async handle(request:Request, response: Response):Promise<Response>{
    const {cpf,email,name} = request.query as IFilterSearchDTO;
    const getUsersService = container.resolve(GetUsersService);

    if(cpf||email||name){
      const userFilter = await getUsersService.execute(request.query);
      return response.status(200).send(userFilter);
    }

    const users = await getUsersService.execute();
    const usersToSend = users?.map((user)=>{
      return new ResponseUserDto(user)
    });
    return response.status(200).send(usersToSend);
  }
}
export {GetUsersController}
