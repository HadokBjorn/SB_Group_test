import 'reflect-metadata';
import { Router } from "express";
import { CreateUserController } from '../../userCases/createUser/CreateUserController';
import { GetUsersController } from '../../userCases/getUsers/GetUsersController';
import { GetByIdUserController } from '../../userCases/getByIdUser/GetByIdUserController';
import { UpdateUserController } from '../../userCases/updateUser/UpdateUserController';
import { DeleteUserController } from '../../userCases/deleteUser/DeleteUserController';
import { AuthenticateUserController } from '../../userCases/authenticateUser/AuthenticateUserController';
import ensureAuthenticated from '../../../../shared/infra/http/middlewares/ensureAuthenticated';

const userRoutes = Router();

const createControllerUser = new CreateUserController();
const getControllerUsers = new GetUsersController();
const getControllerUserById = new GetByIdUserController();
const updateControllerUser = new UpdateUserController();
const deleteControllerUser = new DeleteUserController();
const authenticateControllerUser = new AuthenticateUserController();

userRoutes
  .post('/auth', authenticateControllerUser.handle)
  .post('/', createControllerUser.handle)
  .use(ensureAuthenticated)
  .get('/', getControllerUsers.handle)
  .get('/:id', getControllerUserById.handle)
  .put('/:id', updateControllerUser.handle)
  .delete('/:id', deleteControllerUser.handle)

export{userRoutes};
