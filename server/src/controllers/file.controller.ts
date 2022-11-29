/* eslint-disable class-methods-use-this */
import fse from 'fs-extra';
import { Request, Response } from 'express';
import FileService from 'services/file.service';
import path from 'path';

export default class FileController {
  private service = new FileService();

  public async upload(req: Request, res: Response) {
    try {
      if (!req.file) throw new Error('No file provided');
      if (!await fse.pathExists(req.file.path)) throw new Error('No file was uploaded');
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
    } catch (error: any) {
      res.status(400).json({
        error: {
          message: error.message,
        },
      });
    }
  }
}
