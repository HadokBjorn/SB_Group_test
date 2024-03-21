import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "../../entities/User.entity";
import { ResponseUserDto } from "../../dtos/ResponseUserDto";

@injectable()
class GetUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ){}

  async execute(): Promise<User[]|null|undefined>{
    const users = await this.userRepository.findAll();
    return users;
  }
}
export {GetUsersService}
