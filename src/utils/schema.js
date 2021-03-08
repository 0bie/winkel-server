import fs from 'fs';
import path from 'path';

export const loadTypeSchema = (type) => {

  return new Promise((resolve, reject) => {
    const pathToSchema = path.join(process.cwd(), `src/types/${type}/${type}.gql`);
    fs.readFile(pathToSchema, {encoding: 'utf-8'}, (error, schema) => {
      if (error) return reject(error);
      resolve(schema);
    });
  });

};
