import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import {hash} from 'bcrypt';
import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { cpf as CPF } from "cpf-cnpj-validator";
import { ResponseUserDto } from "../../dtos/ResponseUserDto";

@injectable()
class CreateUserService{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ){}

  async execute(data:ICreateUserDto):Promise<ResponseUserDto>{
    const {name,email,cpf,birth_day,password} = data;
    if (!CPF.isValid(cpf)) {
      throw new AppError('CPF invalid', 400);
    }
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if(userAlreadyExists) throw new AppError('user already exist!', 409)
    const salt = +process.env.SALT;
    const passwordHash = await hash(password, salt);
    const user = await this.userRepository.save({name,email,cpf,birth_day,password: passwordHash})
    return new ResponseUserDto(user);
  }

}
export{CreateUserService}
