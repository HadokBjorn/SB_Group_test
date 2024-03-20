import { inject, injectable } from "tsyringe";
import { UserRepository } from "../../repositories/implementations/UserRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import {hash} from 'bcrypt';
import { AppError } from "../../../../shared/infra/http/errors/AppError";

@injectable()
class CreateUserService{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ){}

  async execute(data:ICreateUserDto){
    const {name,email,cpf,birth_day,password} = data;
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if(userAlreadyExists?.cpf === cpf) throw new AppError('user already exist!', 409)
    if(userAlreadyExists) throw new AppError('user already exist!', 409)
    const salt = 8;
    const passwordHash = await hash(password, salt);
    await this.userRepository.create({name,email,cpf,birth_day,password: passwordHash})
  }

}
export{CreateUserService}
