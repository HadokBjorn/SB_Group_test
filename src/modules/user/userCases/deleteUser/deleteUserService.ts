import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { AppError } from "../../../../shared/infra/http/errors/AppError";

@injectable()
class DeleteUserService{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ){}
  async execute(id: string):Promise<void>{
    const userExist = await this.userRepository.findById(id);
    if(!userExist) throw new AppError('user not found', 404);
    await this.userRepository.delete(userExist);
  }
}
export { DeleteUserService }
