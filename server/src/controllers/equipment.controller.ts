import * as yup from 'yup';
import { Request, Response } from 'express';
import EquipmentService from 'services/equipment.service';
import FileService from 'services/file.service';

export default class EquipmentController {
  private service = new EquipmentService();

  private fileService = new FileService();

  public async create(req: Request, res: Response) {
    try {
      // 2. validation (req.body)
      const schema = yup.object().shape({
        name: yup.string().min(2).max(200).required(),
        count: yup.number().required().positive().integer(),
        link: yup.string().url(),
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
        name: req.body.name,
        count: req.body.count,
        link: req.body.link,
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
