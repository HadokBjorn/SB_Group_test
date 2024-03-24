import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { AppError } from "../../../../shared/infra/http/errors/AppError";
import { sign } from "jsonwebtoken";

interface IRequest{
  email: string;
  password: string;
}
interface IResponse{
  user: {
    name: string,
    email: string,
  };
  token: string;
}
@injectable()
class AuthenticateUserService{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ){}

  async execute({email, password}:IRequest):Promise<IResponse>{
    const user = await this.userRepository.findByEmail(email);
    const SECRET_KEY = process.env.SECRET_KEY;
    if(!user) throw new AppError('E-mail or password incorrect', 209);
    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch) throw new AppError('E-mail or password incorrect', 209);

    const token = sign(
      {},
      SECRET_KEY,
      {
        subject: user._id.toString(),
        expiresIn: '1d'
      }
    )

    const tokenReturnToUser:IResponse = {
      token,
      user:{
        name: user.name,
        email: user.email
      }
    };

    return tokenReturnToUser;
  }
}
export { AuthenticateUserService }
