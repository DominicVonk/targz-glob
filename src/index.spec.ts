import { describe, expect, test } from 'vitest';
import { tarGzGlobFromFile } from './index';

describe('Extract test tar gz', () => {
  test('should only extract single file', async () => {
    const output = await tarGzGlobFromFile(__dirname + '/../test/test.tar.gz', ['*/test.txt']);
    expect(output).toBeInstanceOf(Map);
    expect(output.size).toBe(1);
    for (const [key, content] of output.entries()) {
      expect(key).toBe('./test.txt');
      expect(content).toBe('test file');
    }
  });

  test('should extract multiple files', async () => {
    const output = await tarGzGlobFromFile(__dirname + '/../test/test.tar.gz', ['**/test.txt']);
    expect(output).toBeInstanceOf(Map);
    expect(output.size).toBe(2);
  });
});
