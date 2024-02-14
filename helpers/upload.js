import multer from "multer"
import path from 'path'
import * as url from 'url';
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


    const tempDir = path.join(__dirname, "../", "temp")

    const multerConfig = multer.diskStorage({
        destination: tempDir
      })
      
     export const upload = multer({
        storage:multerConfig
      })