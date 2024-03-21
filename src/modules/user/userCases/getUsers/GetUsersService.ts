import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "../../entities/User.entity";
import IFilterSearchDTO from "../../dtos/IFilterSearchDto";

@injectable()
class GetUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ){}

  async execute(filter?: IFilterSearchDTO): Promise<User[]|null|undefined>{
    if(filter){
      return await this.userRepository.findByFilter(filter);
    }
    const users = await this.userRepository.findAll();
    return users;
  }
}
export {GetUsersService}
