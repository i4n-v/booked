import { Request } from 'express';
import fs from 'fs';
import 'dotenv/config';

class FileSystem {
  uploadedFilePath(request: Request, path: string) {
    const {
      headers: { host },
    } = request;

    const protocol = process.env.NODE_ENV !== 'development' ? 'https' : 'http';

    const url = `${protocol}://${host}${path}`;

    return url;
  }

  filePathToUpload(path: string) {
    const url = path.replace(/.*[\/\\]?public/, '/public');
    return url;
  }

  async removeFile(path: string) {
    try {
      await new Promise((resolve, reject) => {
        fs.unlink(path, (error) => {
          if (error) reject(error);

          resolve(true);
        });
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default new FileSystem();
