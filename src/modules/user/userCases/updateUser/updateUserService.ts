import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { User } from "../../entities/User.entity";

@injectable()
class UpdateUserService{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
    ){}

    async execute(id: string, data: ICreateUserDto):Promise<User>{
      const userExist = await this.userRepository.findById(id);

      if(!userExist) throw new AppError('user not found', 404);

      const toUpdateUser = Object.assign(userExist, data);

      const updatedUser = await this.userRepository.save(toUpdateUser)

      return updatedUser;
    }
}
export { UpdateUserService }
