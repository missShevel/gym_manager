import { type Request, type Response } from 'express';

import UserService from 'services/user.service';

export default class UserController {
  private service = new UserService();

  public async signUp(req: Request, res: Response) {
    try {
      const response = await this.service.signUp(req.body);
      res.json({
        data: response,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
