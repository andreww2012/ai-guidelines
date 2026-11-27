import fs from 'node:fs/promises';
import path from 'node:path';
import {type DocumentName, findExtraSections, getDocumentPath, readDocument} from './documents.ts';

const normalizeContent = (content: string) => content.replaceAll('\r\n', '\n').trim();

/**
 * Resolves to the new content for the copy of the document with the extra sections it has,
 * or `undefined` if the copy is up to date
 */
export const getNewContent = async (document: DocumentName, filePath: string) => {
  const currentContent = normalizeContent(await fs.readFile(filePath, 'utf8'));
  const newContent = await readDocument(document, {
    extraSections: findExtraSections(currentContent),
  });
  return currentContent === normalizeContent(newContent) ? undefined : newContent;
};

/**
 * Updates the copy of the document in the project to the version from this package,
 * keeping the extra sections it has.
 * Resolves to `false` if the copy is already up to date
 */
// eslint-disable-next-line unicorn/consistent-boolean-name -- It's an action, the result only tells if it changed anything
export const updateDocument = async (
  document: DocumentName,
  {
    path: filePath = getDocumentPath(document),
    cwd = process.cwd(),
  }: {
    /** Path to the copy, relative to `cwd` */
    path?: string;
    cwd?: string;
  } = {},
) => {
  const absolutePath = path.resolve(cwd, filePath);
  const newContent = await getNewContent(document, absolutePath);
  if (newContent == null) {
    return false;
  }

  await fs.writeFile(absolutePath, newContent);
  return true;
};
