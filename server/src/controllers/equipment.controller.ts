import { IUpdateEquipment } from './../services/equipment.service';
import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import EquipmentService from 'services/equipment.service';
import FileService from 'services/file.service';
import BaseController from './Base';
import ApiError from 'helpers/ApiError';
import { isAllowed } from 'helpers';

export default class EquipmentController extends BaseController {
  private service = new EquipmentService();

  private fileService = new FileService();

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = res.locals;
      if (!isAllowed(user, 'add_equipments')) throw new ApiError('Forbidden', 400);

      // 2. validation (req.body)
      const schema = yup.object().shape({
        name: yup.string().min(2).max(200).required(),
        count: yup.number().required().positive().integer(),
        link: yup.string().url(),
        fileId: yup.string().uuid(),
      });
      await schema.validate(req.body);
      let avatar;
      if (req.body.fileId) {
        avatar = await this.fileService.findById(req.body.fileId);
        if (!avatar) {
          throw new ApiError(`Avatar with id ${req.body.fileId} was not found`, 400);
        }
      }
      const responce = await this.service.create({
        name: req.body.name,
        count: req.body.count,
        link: req.body.link,
        avatar,
      });

      res.json(responce);
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = res.locals;
      if (!isAllowed(user, 'view_equipments')) throw new ApiError('Forbidden', 400);

      const responce = await this.service.getAll();
      res.json(responce);
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = res.locals;
      if (!isAllowed(user, 'view_equipments')) throw new ApiError('Forbidden', 400);

      const schema = yup.object().shape({
        id: yup.string().uuid().required(),
      });
      await schema.validate(req.params);
      const equipment = await this.service.findById(req.params.id);
      if (!equipment) {
        throw new ApiError(`Equipment with id ${req.params.id} was not found`, 400);
      }
      res.json(equipment);
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = res.locals;
      if (!isAllowed(user, 'edit_equipments')) throw new ApiError('Forbidden', 400);

      const equipmentId = req.params.id;
      const equipment = await this.service.findById(equipmentId);

      if (!equipment) {
        throw new ApiError(`Equipment with id ${equipmentId} was not found`, 400);
      }
      const schema = yup.object().shape({
        name: yup.string().min(2).max(200),
        count: yup.number().positive().integer(),
        link: yup.string().url(),
        fileId: yup.string().uuid(),
      });
      await schema.validate(req.body);
      const { fileId } = req.body;
      let file;
      if (fileId) file = await this.fileService.findById(fileId);
      console.log(file);

      if (!file) {
        throw new ApiError(`File with id ${fileId} was not found`, 400);
      }
      const updateData: IUpdateEquipment = {
        name: req.body.name,
        count: req.body.count,
        link: req.body.link,
      };

      let updatedEquipment = await this.service.updateEquipment(equipment, updateData);
      if (fileId) {
        updatedEquipment = await this.service.updateEquipmentAvatar(updatedEquipment, file);
      }

      res.json(updatedEquipment);
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = res.locals;
      if (!isAllowed(user, 'remove_equipments')) throw new ApiError('Forbidden', 400);

      const equipmentId = req.params.id;
      const equipment = await this.service.findById(equipmentId);
      if (!equipment) {
        throw new ApiError(`Client with id ${equipmentId} was not found`);
      }

      const removedEquipment = await this.service.deleteEquipment(equipment);

      res.json({
        data: removedEquipment,
        deleted: true,
      });
    } catch (error) {
      this.sendError(next, error);
    }
  }
}
