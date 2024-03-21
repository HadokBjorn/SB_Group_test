import 'reflect-metadata';
import { celebrate, Joi, Segments } from 'celebrate';
import {IdRegex, alphanumWithUnderscoreAndHyphenRegex} from '../../../../utils/regex';
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
  .use(ensureAuthenticated)

  .post(
    '/',
    celebrate({
      [Segments.BODY]:{
        name: Joi.string().min(3).max(50).trim().required(),
        cpf: Joi.string().min(11).max(11).trim().required(),
        birth_day: Joi.date().required(),
        email: Joi.string().email().trim().required(),
        password: Joi.string().trim().required(),
      }
    }),
    createControllerUser.handle)
  .get(
    '/',
    celebrate({
      [Segments.QUERY]:{
        name: Joi.string().min(3).regex(/^[a-zA-Z0-9]*$/).trim(),
        cpf: Joi.string().min(11).max(11).trim(),
        email: Joi.string().email().trim()
      }
    }),
    getControllerUsers.handle)
  .get(
    '/:id',
    celebrate({
      [Segments.PARAMS]:{
        id: Joi.string().trim().required()
      }
    }),
    getControllerUserById.handle)
  .put(
    '/:id',
    celebrate({
      [Segments.PARAMS]:{
        id: Joi.string().trim().required()
      },
      [Segments.BODY]:{
        name: Joi.string().min(3).max(50).trim().required(),
        cpf: Joi.string().min(11).max(11).trim().required(),
        birth_day: Joi.date().required(),
        email: Joi.string().email().trim().required(),
        password: Joi.string().trim().required(),
      }
    }),
    updateControllerUser.handle)
  .delete(
    '/:id',
    celebrate({
      [Segments.PARAMS]:{
        id: Joi.string().trim().required()
      }
    }),
    deleteControllerUser.handle)

export{userRoutes};
