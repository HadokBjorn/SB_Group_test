import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetByIdUserService } from "./GetByIdUserService";

class GetByIdUserController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;
    const getByIdUserService = container.resolve(GetByIdUserService);
    const user = await getByIdUserService.execute(id);
    return response.status(200).send(user);
  }
}
export { GetByIdUserController }
