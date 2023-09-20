import path from 'path';
import multer from 'multer';
import ApiError from '../utils/ApiError.js';
import fs from 'fs';
import { nanoid } from 'nanoid';
import httpStatus from 'http-status';

export default function uploadFile(destination, { prefixName = '', suffixName = '' } = {}) {
    const storage = multer.diskStorage({
      destination(req, file, callback) {
        if (!destination) {
          callback(
            new ApiError(
              httpStatus.INTERNAL_SERVER_ERROR,
              'No destination is found to save the file'
            ),
            null
          );
        }
  
        // Create directory if destination directory is not existed
        if (fs.existsSync(destination) === false) {
          fs.mkdirSync(destination, { recursive: true });
        }
  
        callback(null, destination);
      },
      filename(req, file, callback) {
        const extension = path.extname(file.originalname);
  
        if (!extension || extension === '.') {
          callback(
            new ApiError(
              httpStatus.INTERNAL_SERVER_ERROR,
              `${file.originalname} is an invalid file. Please upload a valid file`
            ),
            null
          );
        }
  
        // nanoid: Generates a unique id for file name.
        // As per the docs using 12 string in nanoid the id collision probability is 1000 years
        let fileName = nanoid(12);
  
        if (prefixName) fileName = `${prefixName}-${fileName}`;
        if (suffixName) fileName = `${fileName}-${suffixName}`;
  
        fs.readFile(destination + file.originalname, (err, res) => {
          if (!err) {
            callback(null, `${fileName}.${extension}`);
          } else {
            callback(null, `${fileName}.${extension}`);
          }
        });
      },
    });
  
    return multer({ storage });
  }
