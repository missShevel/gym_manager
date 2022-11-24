import * as yup from 'yup';
import { Request, Response } from 'express';
import ClientService, { IUpdateClient } from 'services/client.service';
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

  public async getAll(_req: Request, res: Response) {
    try {
      const responce = await this.service.getAll();

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

  public async getById(req: Request, res: Response) {
    try {
      const schema = yup.object().shape({
        id: yup.string().uuid().required(),
      });
      await schema.validate(req.params);
      const client = await this.service.findById(req.params.id);
      if (!client) {
        throw new Error(`Client with id ${req.params.id} was not found`);
      }
      res.json({
        data: client,
      });
    } catch (error: any) {
      res.status(400).json({
        error: {
          message: error.message,
        },
      });
    }
  }

  public async updateById(req: Request, res: Response) {
    try {
      const clientId = req.params.id;
      const client = await this.service.findById(clientId);
      if (!client) {
        throw new Error(`Client with id ${clientId} was not found`);
      }
      const schema = yup.object().shape({
        firstName: yup.string(),
        lastName: yup.string(),
        sex: yup.string().oneOf(['male', 'female']),
        status: yup.string().oneOf(USER_STATUSES),
        details: yup.string(),
        fileId: yup.string().uuid(),
      });
      await schema.validate(req.body);
      const { fileId } = req.body;
      const file = await this.fileService.findById(fileId);

      if (!file) {
        throw new Error(`File with id ${fileId} was not found`);
      }
      const updateData: IUpdateClient = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        sex: req.body.sex,
        status: req.body.status,
        details: req.body.details,
      };

      let updatedClient = await this.service.updateClient(client, updateData);
      if (fileId) {
        updatedClient = await this.service.updateClientAvatar(updatedClient, file);
      }
      res.json({
        data: updatedClient,
      });
    } catch (error: any) {
      res.status(400).json({
        error: {
          message: error.message,
        },
      });
    }
  }

  public async deleteById(req: Request, res: Response) {
    try {
      const clientId = req.params.id;
      const client = await this.service.findById(clientId);
      if (!client) {
        throw new Error(`Client with id ${clientId} was not found`);
      }

      const removedClient = await this.service.deleteClient(client);

      res.json({
        data: removedClient,
        deleted: true,
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
