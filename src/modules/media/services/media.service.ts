import { BadRequestException, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class MediaService {
  constructor() {
  }

  async uploadFile(file: any): Promise<any> {
    console.log(file)

    return {
      status: "success"
    };
  }

  async getFileByName(req: any, filename: string) {
    const username = req.headers['user'];
    if (!username) {
      throw new BadRequestException('user not found');
    }

    const dir = `${process.env.SAVE_PATH}/media-storage/${username}`;

    const file = path.join(dir, filename); // Dosya yolunu oluşturun

    const isFile = fs.existsSync(file);

    if (!isFile) {
      throw new BadRequestException("file not found");
    }

    const image = {
      src: `${process.env.EXPRESS_SERVER_FILE}/${username}/${filename}`
    }

    return image;
  }

  async deleteFile(req: any, filename: string) {
    const username = req.headers['user'];
    if (!username) {
      throw new BadRequestException('user not found');
    }

    const dir = `${process.env.SAVE_PATH}/media-storage/${username}`;

    const file = path.join(dir, filename);

    const isFile = fs.existsSync(file);

    if (!isFile) {
      throw new BadRequestException("file not found");
    }

    fs.unlinkSync(file);

    return {
      status: "success",
      message: "file is deleted"
    };
  }

  async deleteMultipleFile(req: any, files: any) {
    const username = req.headers['user'];
    if (!username) {
      throw new BadRequestException('user not found');
    }

    const dir = `${process.env.SAVE_PATH}/media-storage/${username}`;

    for (const file of files) {
      const filePath = path.join(dir, file); // Dosya yolunu oluşturun

      const isFile = fs.existsSync(filePath);

      if (!isFile) {
        throw new BadRequestException("file not found");
      }

      fs.unlinkSync(filePath);
    }

    return {
      status: "success",
      message: "file is deleted"
    };
  }
}
