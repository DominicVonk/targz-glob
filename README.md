This is a TypeScript module that provides a function to extract files from a gzipped tar archive using glob patterns.

The `tarGzGlob` function takes a `Stream` object representing the gzipped tar archive and an array of glob patterns. It returns a promise that resolves to a map of file names to file contents.

```js
import { tarGzGlob } from 'targz-glob';

const stream = fs.createReadStream('archive.tar.gz');
const patterns = ['**/*.txt', '**/*.md'];
// globs to match files against, relative to the archive root directory (e.g., '/foo/bar')
const files = await tarGzGlob(stream, patterns);

console.log(files);
```

The `tarGzGlobFromFile` function is a convenience function that takes a file path and an array of glob patterns and calls the `tarGzGlob` function with a `Stream` object that is created from the file.

```js
import { tarGzGlobFromFile } from 'targz-glob';
const file = './path_to_/archive.tar.gz' // or a Buffer instance of the contents of that file
const patterns = ['**/*.txt', '**/*.md'];

const files = await tarGzGlobFromFile(file, patterns);
console.log(files)
```

***Auto-generated with Blackbox AI***