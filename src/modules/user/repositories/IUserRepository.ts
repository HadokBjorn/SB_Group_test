import { ICreateUserDto } from "../dtos/ICreateUserDto";
import { User } from "../entities/User.entity";

interface IUserRepository{
  create(data: ICreateUserDto): Promise<void>;
  findById(id: string): Promise<User|null|undefined>
  findAll(): Promise<User[]|null|undefined>
  findByEmail(email: string): Promise<User|null|undefined>
  //update(id: string): Promise<User>
  //delete(id: string): Promise<void>
}
export {IUserRepository};
