import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import ClientService, { IUpdateClient } from 'services/client.service';
import { USER_STATUSES } from 'absctracts/user';
import FileService from 'services/file.service';
import User from 'models/user';
import UserService from 'services/user.service';
import ApiError from 'helpers/ApiError';
import { isAllowed } from 'helpers';
import BaseController from './Base';

export default class ClientController extends BaseController {
  private service = new ClientService();

  private fileService = new FileService();

  private userService = new UserService();

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = res.locals;
      if (!isAllowed(user, 'add_clients')) {
        throw new ApiError({
          message: 'Forbidden',
          status: 403,
          code: 'PERMISSION_DENIED',
        });
      }

      const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        sex: yup.string().oneOf(['male', 'female']),
        status: yup.string().oneOf(USER_STATUSES),
        details: yup.string(),
        fileId: yup.string().uuid().nullable().defined(),
        trainerId: yup.string().uuid().nullable().defined(),
      });
      const body = await schema.validate(req.body);
      let avatar;
      if (req.body.fileId) {
        avatar = await this.fileService.findById(req.body.fileId);
        if (!avatar) {
          throw new ApiError({
            message: `Avatar with id ${req.body.fileId} was not found`,
            status: 400,
            code: 'FILE_NOT_FOUND',
          });
        }
      }
      let trainer: User | null = null;
      if (body.trainerId) {
        trainer = await this.userService.findByRoleAndId(body.trainerId, 'TRAINER');
        if (!trainer) {
          throw new ApiError({
            message: `Trainer with id ${req.body.fileId} was not found`,
            status: 400,
            code: 'TRAINER_NOT_FOUND',
          });
        }
      }
      const responce = await this.service.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        sex: req.body.sex,
        status: req.body.status,
        details: req.body.details,
        avatar,
        trainer,
      });

      res.json(responce);
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = res.locals;
      if (!isAllowed(user, 'view_clients')) {
        throw new ApiError({
          message: 'Forbidden',
          status: 403,
          code: 'PERMISSION_DENIED',
        });
      }

      const responce = await this.service.getAll();

      res.json(responce);
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = res.locals;
      if (!isAllowed(user, 'view_clients')) {
        throw new ApiError({
          message: 'Forbidden',
          status: 403,
          code: 'PERMISSION_DENIED',
        });
      }

      const schema = yup.object().shape({
        id: yup.string().uuid().required(),
      });
      await schema.validate(req.params);
      const client = await this.service.findById(req.params.id);
      if (!client) {
        throw new Error(`Client with id ${req.params.id} was not found`);
      }
      res.json(client);
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = res.locals;
      if (!isAllowed(user, 'edit_clients')) {
        throw new ApiError({
          message: 'Forbidden',
          status: 403,
          code: 'PERMISSION_DENIED',
        });
      }

      const clientId = req.params.id;
      const client = await this.service.findById(clientId);
      if (!client) {
        throw new ApiError({
          message: `Client with id ${clientId} was not found`,
          status: 400,
          code: 'CLIENT_NOT_FOUND',
        });
      }
      const schema = yup.object().shape({
        firstName: yup.string(),
        lastName: yup.string(),
        sex: yup.string().oneOf(['male', 'female']),
        status: yup.string().oneOf(USER_STATUSES),
        details: yup.string(),
        fileId: yup.string().uuid().nullable().defined(),
        trainerId: yup.string().uuid().nullable().defined(),
      });
      const body = await schema.validate(req.body);
      const { fileId, trainerId } = body;
      let file = null;
      if (fileId) file = await this.fileService.findById(fileId);

      if (fileId && !file) {
        throw new ApiError({
          message: `File with id ${fileId} was not found`,
          status: 400,
          code: 'FILE_NOT_FOUND',
        });
      }
      let trainer = null;
      if (trainerId) trainer = await this.userService.findByRoleAndId(trainerId, 'TRAINER');

      if (trainerId && !trainer) {
        throw new ApiError({
          message: `Trainer with id ${fileId} was not found`,
          status: 400,
          code: 'FILE_NOT_FOUND',
        });
      }
      const updateData: IUpdateClient = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        sex: req.body.sex,
        status: req.body.status,
        details: req.body.details,
      };

      let updatedClient = await this.service.updateClient(client, updateData);
      updatedClient = await this.service.updateClientAvatar(updatedClient, file);
      updatedClient = await this.service.updateClientTrainer(updatedClient, trainer);
      res.json(updatedClient);
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = res.locals;
      if (!isAllowed(user, 'remove_clients')) {
        throw new ApiError({
          message: 'Forbidden',
          status: 403,
          code: 'PERMISSION_DENIED',
        });
      }

      const clientId = req.params.id;
      const client = await this.service.findById(clientId);
      if (!client) {
        throw new ApiError({
          message: `Client with id ${clientId} was not found`,
          status: 400,
          code: 'CLIENT_NOT_FOUND',
        });
      }

      const removedClient = await this.service.deleteClient(client);

      res.json({
        data: removedClient,
        deleted: true,
      });
    } catch (error) {
      this.sendError(next, error);
    }
  }
}
