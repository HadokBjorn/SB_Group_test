import 'reflect-metadata'
import { container } from "tsyringe";
import { UserRepositoryMock } from "modules/provider/fakes/UserRepositoryMock";
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { ObjectId } from 'mongodb';
import { User } from 'modules/user/entities/User.entity';
import { DeleteUserService } from './DeleteUserService';


let deleteUserService: DeleteUserService;
let userRepositoryMock: UserRepositoryMock;


describe('UpdateUserService Tests',()=>{

  beforeEach(()=>{
    userRepositoryMock = new UserRepositoryMock();
    deleteUserService = new DeleteUserService(userRepositoryMock);
    jest.spyOn(container, 'resolve').mockImplementationOnce(()=>{
      return deleteUserService;
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

  it('Should delete a user',async()=>{
    await userRepositoryMock.save(user);
    await deleteUserService.execute(user._id.toString());
    const response = await userRepositoryMock.findById(user._id.toString());
    expect(response).toBeNull()
  });

  it('Should return a Exception Error when user not exist',async()=>{
    await userRepositoryMock.save(user);
    expect(async()=>{
      await deleteUserService.execute(new ObjectId().toString());
    }).rejects.toBeInstanceOf(AppError)
  });

})
