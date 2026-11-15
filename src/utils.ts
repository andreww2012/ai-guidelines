import path from 'node:path';
import {attemptAsync} from 'utilery/function';
import {toForwardSlashes} from 'utilery/path';
import {exec} from 'utilery/server';

export {arrayIncludes} from 'utilery/array';
export {maybeCall} from 'utilery/function';
export {invariant} from 'utilery/misc';
export {exec, pathExistsSync, readFileSafe} from 'utilery/server';

/** Relative link to the file that always starts with `./` or `../` */
export const toRelativeLink = (directory: string, filePath: string) => {
  const relativePath = toForwardSlashes(path.relative(directory, filePath));
  return relativePath.startsWith('../') ? relativePath : `./${relativePath}`;
};

export const hasUncommittedChanges = async (filePath: string) => {
  // Fails if it's not a git repository or git is not installed
  const [, result] = await attemptAsync(() =>
    exec('git', ['status', '--porcelain', '--', filePath]),
  );
  return result != null && result.stdout.trim().length > 0;
};
