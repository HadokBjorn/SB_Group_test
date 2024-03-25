import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { ResponseUserDto } from "modules/user/dtos/ResponseUserDto";

@injectable()
class GetByIdUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
    ){}

    async execute(id: string):Promise<ResponseUserDto>{
      const user = await this.userRepository.findById(id);
      if(!user) throw new AppError('user not found!', 404)
      return new ResponseUserDto(user);
    }
}
export { GetByIdUserService }
