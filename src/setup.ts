import fs from 'node:fs/promises';
import path from 'node:path';
import {
  EXTRA_SECTIONS,
  type ExtraSectionName,
  getDocumentPath,
  getInstruction,
  readDocument,
} from './documents.ts';
import {readFileSafe, readJsonFileSafe, toRelativeLink} from './utils.ts';

export const AGENTS_FILE = 'AGENTS.md';

const DEPENDENCY_FIELDS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
] as const;

/** Names of the extra sections for the packages that `package.json` in `cwd` depends on */
export const detectExtraSections = async (cwd = process.cwd()) => {
  const packageJson = await readJsonFileSafe<
    Partial<Record<(typeof DEPENDENCY_FIELDS)[number], Record<string, unknown>>>
  >(path.join(cwd, 'package.json'));
  return EXTRA_SECTIONS.filter((section) =>
    DEPENDENCY_FIELDS.some((field) => packageJson?.[field]?.[section] != null),
  );
};

/**
 * Adds the instruction that links the guidelines to the beginning of `AGENTS.md`, or creates it.
 * With the local link, also copies the guidelines into the project and fails if the copy exists
 */
export const setupGuidelines = async ({
  link = 'local',
  path: guidelinesPath = getDocumentPath('guidelines'),
  extraSections: extraSectionsFromOptions,
  cwd = process.cwd(),
}: {
  /** `local` copies the guidelines into the project, `remote` links the file on GitHub */
  link?: 'local' | 'remote';

  /**
   * Where to copy the guidelines, relative to `cwd`.
   * Only used with the local link
   */
  path?: string;

  /**
   * Extra sections for specific tools, by default the ones for the project's dependencies.
   * With the local link, they are added to the copy, otherwise they are linked too
   */
  extraSections?: readonly ExtraSectionName[];
  cwd?: string;
} = {}) => {
  const extraSections = extraSectionsFromOptions || (await detectExtraSections(cwd));
  const absoluteGuidelinesPath = path.resolve(cwd, guidelinesPath);
  if (link === 'local') {
    const [content] = await Promise.all([
      readDocument('guidelines', {extraSections}),
      fs.mkdir(path.dirname(absoluteGuidelinesPath), {recursive: true}),
    ]);
    await fs.writeFile(absoluteGuidelinesPath, content, {flag: 'wx'});
  }

  const instruction =
    link === 'local'
      ? getInstruction(toRelativeLink(cwd, absoluteGuidelinesPath))
      : getInstruction(undefined, extraSections);
  const agentsFilePath = path.join(cwd, AGENTS_FILE);
  const agentsFileContent = await readFileSafe(agentsFilePath);
  await fs.writeFile(
    agentsFilePath,
    agentsFileContent == null ? instruction : `${instruction}\n${agentsFileContent}`,
  );
};
