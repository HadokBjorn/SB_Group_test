import { Response, Request } from "express";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { container } from "tsyringe";
import { UpdateUserService } from "./UpdateUserService";
import { ResponseUserDto } from "../../dtos/ResponseUserDto";
class UpdateUserController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.params;
    const {name,email,cpf,birth_day,password} = request.body as ICreateUserDto;
    const updateUserService = container.resolve(UpdateUserService);
    const updateUser = await updateUserService.execute(id, {
      name,
      email,
      cpf,
      birth_day,
      password
    });
    return response.status(201).send(new ResponseUserDto(updateUser));
  }
}
export { UpdateUserController }
