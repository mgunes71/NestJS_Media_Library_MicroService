import { BadRequestException, Module } from "@nestjs/common";
import { MediaService } from "./services/media.service";
import { MediaController } from "./controllers/media.controller";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";
import * as fs from "fs";


@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          try {
            const username: any = req.headers["user"];
            if (!username) {
              cb(Error('user not found'), null);
            }

            const userFolder = path.join("media-storage/", username);

            // Kullanıcı klasörünü oluşturun
            fs.mkdirSync(userFolder, { recursive: true });

            cb(null, userFolder);

          } catch (e) {

          }
        },
        filename: (req, file, cb) => {
          try {
            const username: any = req.headers["user"];
            if (!username) {
              cb(Error('user not found'), null);
              return false;
            }
            cb(null, file.originalname);
          } catch (e) {

          }
        }
      })
    })
  ],
  controllers: [MediaController],
  providers: [MediaService],
  exports: []
})
export class MediaModule {
}
