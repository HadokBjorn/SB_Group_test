import 'reflect-metadata'
import { container } from "tsyringe";
import { UserRepositoryMock } from "modules/provider/fakes/UserRepositoryMock";
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { ObjectId } from 'mongodb';
import { User } from 'modules/user/entities/User.entity';
import { ResponseUserDto } from 'modules/user/dtos/ResponseUserDto';
import { UpdateUserService } from './UpdateUserService';
import { ICreateUserDto } from 'modules/user/dtos/ICreateUserDto';


let updateUserService: UpdateUserService;
let userRepositoryMock: UserRepositoryMock;


describe('UpdateUserService Tests',()=>{

  beforeEach(()=>{
    userRepositoryMock = new UserRepositoryMock();
    updateUserService = new UpdateUserService(userRepositoryMock);
    jest.spyOn(container, 'resolve').mockImplementationOnce(()=>{
      return updateUserService;
    })
  });

  const user:User = {
    _id: new ObjectId(),
    name: "Joao test1",
    cpf: "24828502076",
    birth_day: new Date('2000-08-21'),
    email: "joaotest1@gmail.com",
    password: "12345678"
  };

  it('Should return a updated user',async()=>{
    await userRepositoryMock.save(user);
    const userToUpdate:ICreateUserDto = {
      name: 'my name updated',
      cpf: '21561831042',
      birth_day: new Date('2000-08-21'),
      email: "joaotest1@gmail.com",
      password: "12345678"
    }
    const mockUserUpdated = Object.assign(user, userToUpdate)
    const response = await updateUserService.execute(user._id.toString(),userToUpdate);

    expect(response).toEqual(new ResponseUserDto(mockUserUpdated))
  });

  it('Should return a Exception Error when user not exist',async()=>{
    await userRepositoryMock.save(user);
    const userToUpdate:ICreateUserDto = {
      name: 'my name updated',
      cpf: '21561831042',
      birth_day: new Date('2000-08-21'),
      email: "joaotest1@gmail.com",
      password: "12345678"
    }

    expect(async()=>{
      await updateUserService.execute(new ObjectId().toString(),userToUpdate);
    }).rejects.toBeInstanceOf(AppError)
  });

  it('Should return a updated user',async()=>{
    await userRepositoryMock.save(user);
    const userToUpdate:ICreateUserDto = {
      name: 'my name updated',
      cpf: '12345678911',
      birth_day: new Date('2000-08-21'),
      email: "joaotest1@gmail.com",
      password: "12345678"
    }
    const mockUserUpdated = Object.assign(user, userToUpdate)

    expect(async()=>{
      await updateUserService.execute(user._id.toString(),userToUpdate);
    }).rejects.toBeInstanceOf(AppError)
  });

})
