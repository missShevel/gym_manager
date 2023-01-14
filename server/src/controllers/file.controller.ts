/* eslint-disable class-methods-use-this */
import fse from 'fs-extra';
import { NextFunction, Request, Response } from 'express';
import FileService from 'services/file.service';
import path from 'path';
import ApiError from 'helpers/ApiError';
import BaseController from './Base';

export default class FileController extends BaseController {
  private service = new FileService();

  public async upload(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new ApiError({
          message: 'No file provided',
          status: 400,
          code: 'FILE_NOT_PROVIDED',
        });
      }
      if (!(await fse.pathExists(req.file.path))) {
        throw new ApiError({
          message: 'No file was uploaded',
          status: 400,
          code: 'FILE_NOT_UPLOADED',
        });
      }
      const ext = path.extname(req.file.path);
      const basename = path.parse(req.file.originalname).name;
      const id = path.parse(req.file.filename).name;

      const file = await this.service.create({
        id,
        name: basename,
        extention: ext,
      });

      res.json(file);
    } catch (error) {
      this.sendError(next, error);
    }
  }

  public async download(req: Request, res: Response, next: NextFunction) {
    try {
      const { fileId } = req.params;
      const file = await this.service.findById(fileId);
      const filePath = `files/${file.id}${file.extention}`;

      const fileStream = await fse.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      this.sendError(next, error);
    }
  }
}
