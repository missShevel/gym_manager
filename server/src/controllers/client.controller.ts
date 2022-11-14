import * as yup from 'yup';
import { Request, Response } from 'express';
import ClientService from 'services/client.service';
import { USER_STATUSES } from 'absctracts/user';
import FileService from 'services/file.service';

export default class ClientController {
  private service = new ClientService();

  private fileService = new FileService();

  public async create(req: Request, res: Response) {
    try {
      // 2. validation (req.body)
      const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        sex: yup.string().oneOf(['male', 'female']),
        status: yup.string().oneOf(USER_STATUSES),
        details: yup.string(),
        fileId: yup.string(),
      });
      await schema.validate(req.body);
      let avatar;
      if (req.body.fileId) {
        avatar = await this.fileService.findById(req.body.fileId);
        if (!avatar) {
          throw new Error(`Avatar with id ${req.body.fileId} was not found`);
        }
      }
      const responce = await this.service.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        sex: req.body.sex,
        status: req.body.status,
        details: req.body.details,
        avatar,
      });

      res.json({
        data: responce,
      });
    } catch (error: any) {
      res.status(400).json({
        error: {
          message: error.message,
        },
      });
    }
  }
}
