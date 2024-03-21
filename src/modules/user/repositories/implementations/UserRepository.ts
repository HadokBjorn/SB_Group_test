import { Repository } from "typeorm";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { User } from "../../entities/User.entity";
import { IUserRepository } from "../IUserRepository";
import { AppDataSource } from "../../../../config/typeorm";
import { ObjectId } from "mongodb";

class UserRepository implements IUserRepository {
  private repository: Repository<User>
  constructor(){
    this.repository = AppDataSource.getRepository(User);
  }

  async save(data: ICreateUserDto): Promise<User> {
    const{name,cpf,email,birth_day,password} = data;
    const user = this.repository.create({
      name,
      cpf,
      email,
      birth_day,
      password
    })
    return await this.repository.save(user);
  }

  async findById(id: string): Promise<User | null | undefined> {
    const user = await this.repository.findOne({where:{_id: new ObjectId(id)}})
    return user;
  }

  async findByEmail(email: string): Promise<User | null | undefined> {
    const user = await this.repository.findOne({where:{email}})
    return user;
  }

  async findAll(): Promise<User[] | null | undefined> {
    const users = await this.repository.find()
    return users;
  }

  async delete(user: User): Promise<void> {
    this.repository.delete(user)
  }

}
export{UserRepository}
