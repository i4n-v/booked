import { Request } from 'express';
import fs from 'fs';

class FileSystem {
  uploadedFilePath(request: Request, path: string) {
    const {
      protocol,
      headers: { host },
    } = request;

    const url = `${protocol}://${host}${path}`;

    return url;
  }

  filePathToUpload(path: string) {
    const url = path.replace(/.*\/public/, '/public');
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
