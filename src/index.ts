import * as fs from 'fs';
import globToRegExp from 'glob-regex';
import { type Stream } from 'stream';
import * as tar from 'tar-stream';
import * as zlib from 'zlib';

export async function tarGzGlob(stream: Stream, patterns: string | string[]): Promise<Map<string, string>> {
  const patternList = Array.isArray(patterns) ? patterns : [patterns];
  return new Promise((resolve) => {
    const extract = tar.extract();

    const files = new Map<string, string>();
    let lastMatchedFile = '';
    let currentFile = '';

    extract.on('entry', function (header, stream, cb) {
      stream.on('data', function (chunk: string) {
        console.log(header.name);
        if (header.name === lastMatchedFile) {
          currentFile += chunk;
          return;
        }
        for (const pattern of patternList) {
          if (globToRegExp(pattern).test(header.name)) {
            currentFile += chunk;
            lastMatchedFile = header.name;
            continue;
          }
        }
      });

      stream.on('end', function () {
        if (currentFile) {
          files.set(header.name, currentFile);
          currentFile = '';
        }
        cb();
      });

      stream.resume();
    });
    extract.on('finish', function () {
      resolve(files);
    });
    stream.pipe(zlib.createGunzip()).pipe(extract);
  });
}

export async function tarGzGlobFromFile(file: string, patterns: string | string[]) {
  return tarGzGlob(fs.createReadStream(file), patterns);
}

export default tarGzGlob;
