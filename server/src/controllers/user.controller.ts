import * as yup from 'yup';
import environment from 'environment';
import { type Request, type Response, type NextFunction } from 'express';
import UserService, { IUpdateData } from 'services/user.service';
import {
  RolePermissions, ROLES, TRolePermissions, UserSex, USER_SEX,
} from 'absctracts';
import FileService from 'services/file.service';
import { encrypt, isAllowed } from 'helpers';
import RoleService from 'services/role.service';
import ApiError from 'helpers/ApiError';
import SessionService from 'services/session.service';
import BaseController from './Base';

export default class UserController extends BaseController {
  private service = new UserService();

  private sessionService = new SessionService();

  private fileService = new FileService();

  private roleService = new RoleService();

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, session } = await this.service.signIn(req.body);

      res.cookie('sessionId', session.id, {
        httpOnly: true,
        secure: environment.NODE_ENV === 'production',
        maxAge: environment.COOKIE_EXPIRE,
      });

      res.json(user);
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const { user } = res.locals;

    try {
      const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        sex: yup.string().oneOf(USER_SEX),
        password: yup.string().min(2).required(),
        fileId: yup.string().uuid().nullable().defined(),
        role: yup.string().oneOf(ROLES),
      });
      const body = await schema.validate(req.body);
      let avatar = null;
      if (req.body.fileId) {
        avatar = await this.fileService.findById(req.body.fileId);
        if (!avatar) {
          throw new Error(`Avatar with id ${req.body.fileId} was not found`);
        }
      }
      const requiredPermission = RolePermissions[body.role as keyof TRolePermissions].add;
      if (!isAllowed(user, requiredPermission)) {
        throw new ApiError({
          message: 'Forbidden',
          status: 403,
          code: 'PERMISSION_DENIED',
        });
      }
      const role = await this.roleService.findByIdOrFail(body.role as string);
      const createdUser = await this.service.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        sex: body.sex as UserSex,
        passwordHash: await encrypt(body.password),
        avatar,
        role,
      });

      res.json(createdUser);
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async getMe(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(res.locals.user);
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async logOut(req: Request, res: Response, next: NextFunction) {
    try {
      const { sessionId }: { sessionId: string } = req.cookies;

      await this.sessionService.deleteById(sessionId);

      res.clearCookie('sessionId');

      res.json({});
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    const { user } = res.locals;

    try {
      const schema = yup.object().shape({
        search: yup.string(),
        role: yup.string().oneOf(ROLES),
      });
      const query = await schema.validate(req.query);
      let requiredPermissions = '';
      if (query.role === 'MANAGER') {
        requiredPermissions = 'view_managers';
      }
      if (query.role === 'TRAINER') {
        requiredPermissions = 'view_trainer';
      }
      if (!isAllowed(user, requiredPermissions)) {
        throw new ApiError({
          message: 'Forbidden',
          status: 403,
          code: 'PERMISSION_DENIED',
        });
      }

      let role;
      if (query.role) {
        role = await this.roleService.findByIdOrFail(query.role as string);
      }
      const users = await this.service.getAll({
        search: query.search,
        role,
      });

      res.json(users);
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async getShortList(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = yup.object().shape({
        role: yup.string().oneOf(ROLES),
      });
      const query = await schema.validate(req.query);

      let role;
      if (query.role) {
        role = await this.roleService.findByIdOrFail(query.role as string);
      }
      const users = await this.service.getAll({
        role,
      });

      res.json(users.map((u) => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
      })));
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = res.locals;
      const userId = req.params.id;
      const userToDelete = await this.service.findById(userId);
      if (!userToDelete) {
        throw new ApiError({
          message: `User with id ${userId} was not found`,
          status: 400,
          code: 'USER_NOT_FOUND',
        });
      }
      const permission = RolePermissions[userToDelete.role.id as keyof TRolePermissions].remove;
      if (!isAllowed(user, permission)) {
        throw new ApiError({
          message: 'Forbidden',
          status: 403,
          code: 'PERMISSION_DENIED',
        });
      }

      await this.service.deleteUser(userToDelete);

      res.json({
        data: userToDelete,
        deleted: true,
      });
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    const { user } = res.locals;

    try {
      const schema = yup
        .object()
        .noUnknown(true)
        .shape({
          firstName: yup.string().required(),
          lastName: yup.string().required(),
          email: yup.string().email().required(),
          sex: yup.string().oneOf(USER_SEX),
          password: yup.string().min(2).nullable().defined(),
          fileId: yup.string().uuid().nullable().defined(),
        });
      const body = await schema.validate(req.body);
      const userId = req.params.id;
      let userToupdate = await this.service.findById(userId);
      if (!userToupdate) {
        throw new ApiError({
          message: `User with id ${userId} was not found`,
          status: 400,
          code: 'USER_NOT_FOUND',
        });
      }
      const permission = RolePermissions[userToupdate.role.id as keyof TRolePermissions].edit;
      if (!isAllowed(user, permission)) {
        throw new ApiError({
          message: 'Forbidden',
          status: 403,
          code: 'PERMISSION_DENIED',
        });
      }
      const { fileId } = body;
      let file = null;
      if (fileId) file = await this.fileService.findById(fileId);

      if (fileId && !file) {
        throw new ApiError({
          message: `File with id ${fileId} was not found`,
          status: 400,
          code: 'FILE_NOT_FOUND',
        });
      }

      const updateData: IUpdateData = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        sex: body.sex as UserSex,
      };

      userToupdate = await this.service.updateData(userToupdate, updateData);
      userToupdate = await this.service.updateAvatar(userToupdate, file);

      if (body.password) {
        const passwordHash = await encrypt(body.password);
        userToupdate = await this.service.updatePassword(userToupdate, passwordHash);
      }
      res.json(userToupdate);
    } catch (error) {
      this.sendError(next, error);
    }
  }
}
