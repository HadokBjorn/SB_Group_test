import 'reflect-metadata';
import { Router } from "express";
import { CreateUserController } from '../../userCases/createUser/CreateUserController';
import { GetUsersController } from '../../userCases/getUsers/GetUsersController';
import { GetByIdUserController } from '../../userCases/getByIdUser/GetByIdUserController';

const userRoutes = Router();

const createControllerUser = new CreateUserController();
const getControllerUsers = new GetUsersController();
const getControllerUserById = new GetByIdUserController();

userRoutes
  .post('/', createControllerUser.handle)
  .get('/', getControllerUsers.handle)
  .get('/:id', getControllerUserById.handle)

export{userRoutes};
