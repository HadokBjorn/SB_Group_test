import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { User } from "../../entities/User.entity";

@injectable()
class GetByIdUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
    ){}

    async execute(id: string):Promise<User>{
      const user = await this.userRepository.findById(id);
      if(!user) throw new AppError('user not found!', 404)
      return user;
    }
}
export { GetByIdUserService }
