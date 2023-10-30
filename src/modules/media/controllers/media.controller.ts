import {
  BadRequestException, Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, Req,
  Res,
  UploadedFile, UploadedFiles,
  UseInterceptors
} from "@nestjs/common";
import { MediaService } from "../services/media.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

@Controller("media")
export class MediaController {
  constructor(private mediaService: MediaService) {
  }


  @Post('files')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>):Promise<any> {
    console.log(files);
    return {
      status: 'success',
      message: 'files are created',
    }
  }

  @Get(":filename")
  async serveFile(@Req() req: any, @Param("filename") filename: string) {
    const file = await this.mediaService.getFileByName(req, filename);
    return file;
  }

  @Delete(":filename")
  async deleteFile(@Req() req: any, @Param("filename") filename: string) {
    return this.mediaService.deleteFile(req, filename);
  }

  @Delete()
  async deleteMultipleFile(@Req() req: any, @Body() files: any) {
    return this.mediaService.deleteMultipleFile(req, files);
  }
}
