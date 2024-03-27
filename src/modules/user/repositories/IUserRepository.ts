import { ICreateUserDto } from "../dtos/ICreateUserDto";
import IFilterSearchDTO from "../dtos/IFilterSearchDto";
import { User } from "../entities/User.entity";

interface IUserRepository{
  save(data: ICreateUserDto): Promise<User>;
  findById(id: string): Promise<User|null|undefined>
  findByEmail(email: string): Promise<User|null|undefined>
  findAll(filter?: IFilterSearchDTO):Promise<User[]|null|undefined>
  delete(user: User): Promise<void>
  update(data: User):Promise<User>
}
export {IUserRepository};
