import { ICreateUserDto } from "../dtos/ICreateUserDto";
import { User } from "../entities/User.entity";

interface IUserRepository{
  save(data: ICreateUserDto): Promise<User>;
  findById(id: string): Promise<User|null|undefined>
  findAll(): Promise<User[]|null|undefined>
  findByEmail(email: string): Promise<User|null|undefined>
  delete(user: User): Promise<void>
}
export {IUserRepository};
