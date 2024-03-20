import { inject, injectable } from "tsyringe";
import { UserRepository } from "../../repositories/implementations/UserRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";

@injectable()
class CreateUserService{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ){}

  async execute(data:ICreateUserDto){
    const {name,email,cpf,birth_day,password} = data;
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    
    if(userAlreadyExists) return

    await this.userRepository.create({name,email,cpf,birth_day,password})
  }

}
