import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { ResponseUserDto } from "modules/user/dtos/ResponseUserDto";
import { cpf as CPF } from "cpf-cnpj-validator";

@injectable()
class UpdateUserService{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
    ){}

    async execute(id: string, data: ICreateUserDto):Promise<ResponseUserDto>{
      const userExist = await this.userRepository.findById(id);

      if(!userExist) throw new AppError('user not found', 404);

      if (!CPF.isValid(data.cpf)) {
        throw new AppError('CPF invalid', 400);
      }

      const toUpdateUser = Object.assign(userExist, data);

      const updatedUser = await this.userRepository.update(toUpdateUser)

      return new ResponseUserDto(updatedUser);
    }
}
export { UpdateUserService }
