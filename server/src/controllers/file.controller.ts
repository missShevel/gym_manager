/* eslint-disable class-methods-use-this */
import fse from 'fs-extra';
import { NextFunction, Request, Response } from 'express';
import FileService from 'services/file.service';
import path from 'path';
import BaseController from './Base';
import ApiError from 'helpers/ApiError';

export default class FileController extends BaseController {
  private service = new FileService();

  public async upload(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new ApiError('No file provided', 400);
      if (!(await fse.pathExists(req.file.path))) throw new ApiError('No file was uploaded', 400);
      const ext = path.extname(req.file.path);
      const basename = path.parse(req.file.originalname).name;
      const id = path.parse(req.file.filename).name;

      const file = await this.service.create({
        id,
        name: basename,
        extention: ext,
      });

      res.json({
        data: file,
      });
    } catch (error) {
      this.sendError(next, error);
    }
  }
}