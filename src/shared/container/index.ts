import { container } from "tsyringe";
import { IUserRepository } from "../../modules/user/repositories/IUserRepository";
import { UserRepository } from "../../modules/user/repositories/implementations/UserRepository";

container.registerSingleton<IUserRepository>('UserRepository',UserRepository)
