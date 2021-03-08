"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadTypeSchema = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

const loadTypeSchema = type => {
  return new Promise((resolve, reject) => {
    const pathToSchema = _path.default.join(process.cwd(), `src/types/${type}/${type}.gql`);

    _fs.default.readFile(pathToSchema, {
      encoding: 'utf-8'
    }, (error, schema) => {
      if (error) return reject(error);
      resolve(schema);
    });
  });
};

exports.loadTypeSchema = loadTypeSchema;