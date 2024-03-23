import { ICreateUserDto } from "modules/user/dtos/ICreateUserDto";
import IFilterSearchDTO from "modules/user/dtos/IFilterSearchDto";
import { User } from "modules/user/entities/User.entity";
import { IUserRepository } from "modules/user/repositories/IUserRepository";
import { ObjectId } from "mongodb";

class UserRepositoryMock implements IUserRepository{
  private users: User[] = [];

  async save(data: ICreateUserDto): Promise<User> {
    const newUser = {
      _id: new ObjectId(),
      ...data
    }
    this.users.push(newUser)
    return newUser;
  }
  async findById(id: string): Promise<User> {
    return this.users.find(user=>user._id.toString() === id)||null
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find(user=>user.email === email)||null
  }
  async findAll(filter?: IFilterSearchDTO): Promise<User[]|null|undefined> {
    if(filter.name){
      return this.users.filter(user=>user.name===filter.name)
    }
    if(filter.cpf){
      return this.users.filter(user=>user.cpf===filter.cpf)
    }
    if(filter.email){
      return this.users.filter(user=>user.email===filter.email)
    }
    return this.users;
  }
  async delete(user: User): Promise<void> {
    const index = this.users.findIndex(u=>u._id===user._id);
    if(index!==-1){
      this.users.splice(index, 1);
    }
  }

}
export {UserRepositoryMock}
