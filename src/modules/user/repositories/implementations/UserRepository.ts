import { MongoRepository } from "typeorm";
import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { User } from "../../entities/User.entity";
import { IUserRepository } from "../IUserRepository";
import { AppDataSource } from "../../../../config/typeorm";
import { ObjectId } from "mongodb";
import IFilterSearchDTO from "../../dtos/IFilterSearchDto";

class UserRepository implements IUserRepository {
  private repository: MongoRepository<User>
  constructor(){
    this.repository = AppDataSource.getMongoRepository(User);
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

  async findAll(filter?: IFilterSearchDTO): Promise<User[] | null | undefined> {
    const { name, cpf, email } = filter;
    const matchConditions = [];

    if (name) {
      const newName = name.replace(/_/g, ' ')
      matchConditions.push({ name: { $regex: `.*${newName}.*`, $options: 'i', } });
    }

    if (cpf) {
      matchConditions.push({ cpf: { $eq: cpf } });
    }

    if (email) {
      matchConditions.push({ email: { $eq: email } });
    }

    if (matchConditions.length === 0) {
      return await this.repository.find();
    }

    const users = this.repository.aggregate([
      { $match: { $and: matchConditions } }
    ]);

    const collection: User[] = [];
    await users.forEach(document => {
      collection.push(document);
    });

    return collection;

}

  async delete(user: User): Promise<void> {
    this.repository.delete(user)
  }

}
export{UserRepository}
