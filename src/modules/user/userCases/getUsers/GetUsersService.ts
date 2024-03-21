import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "../../entities/User.entity";
import IFilterSearchDTO from "../../dtos/IFilterSearchDto";
import { ResponseUserDto } from "../../dtos/ResponseUserDto";

@injectable()
class GetUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ){}

  async execute(filter?: IFilterSearchDTO): Promise<ResponseUserDto[]|null|undefined>{
    const users = await this.userRepository.findAll(filter);

    const usersToSend = users?.map((user)=>{
      return new ResponseUserDto(user)
    });

    return usersToSend;
  }
}
export {GetUsersService}
