import * as yup from 'yup';
import environment from 'environment';
import { type Request, type Response, type NextFunction } from 'express';
import UserService from 'services/user.service';
import {
  RolePermissions,
  ROLES,
  TRolePermissions,
  UserSex,
  USER_SEX,
} from 'absctracts';
import FileService from 'services/file.service';
import { encrypt, isAllowed } from 'helpers';
import RoleService from 'services/role.service';
import ApiError from 'helpers/ApiError';
import BaseController from './Base';

export default class UserController extends BaseController {
  private service = new UserService();

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

      res.json({
        data: user,
      });
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
        fileId: yup.string(),
        role: yup.string().oneOf(ROLES),
      });
      const body = await schema.validate(req.body);
      let avatar;
      if (req.body.fileId) {
        avatar = await this.fileService.findById(req.body.fileId);
        if (!avatar) {
          throw new Error(`Avatar with id ${req.body.fileId} was not found`);
        }
      }
      const requiredPermission = RolePermissions[body.role as keyof TRolePermissions].add;
      if (!isAllowed(user, requiredPermission)) throw new ApiError('Forbidden', 400);
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

      res.json({
        data: createdUser,
      });
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async getMe(_req: Request, res: Response, next: NextFunction) {
    try {

      res.json(res.locals.user)

    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async logOut(req: Request, res: Response, next: NextFunction) {
    try {

    const { sessionId }: { sessionId: string } = req.cookies;

     const user = await this.service.logOut(sessionId);

     req.cookies = [];

     res.json({
       user,
       signedOut = "true",
     });

    } catch( error ) {
      this.sendError(next, error);
    }







  }
}
