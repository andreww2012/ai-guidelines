import fs from 'node:fs/promises';
import path from 'node:path';
import packageJson from '../package.json' with {type: 'json'};
import {allUnionMembers, invariant} from './utils.ts';

const commitHashFromBuild = process.env.DOCUMENTS_COMMIT_HASH;
invariant(commitHashFromBuild, 'DOCUMENTS_COMMIT_HASH was not set during the build');

const GIT_EXTENSION_REGEX = /\.git$/;

const HEADING_REGEX = /^# .+/;

const HEADING_LEVEL_REGEX = /^#+(?= )/gm;

const HEADING_TEXT_REGEX = /^#+ (.+)$/gm;

// With the blank line before it, so that removing it leaves no extra blank line
const EXTRA_SECTION_MARK_REGEX = /\n{2}<!-- ai-guidelines section: ([\w-]+) -->$/gm;

// `<owner>/<repo>`
const repository = new URL(packageJson.repository.url).pathname
  .slice(1)
  .replace(GIT_EXTENSION_REGEX, '');

// Changesets creates it on publish
const tag = `${packageJson.name}@${packageJson.version}`;

const listFormat = new Intl.ListFormat('en');

/**
 * Hash of the last commit that changed the documents shipped with this version of the package.
 * Unlike a tag, a commit can't be moved, so it's useful for links that must never change
 */
export const documentsCommitHash = commitHashFromBuild;

/** Names of the documents shipped with the package */
export const DOCUMENTS = ['guidelines'] as const;

export type DocumentName = (typeof DOCUMENTS)[number];

/** Name of the extra section for a specific tool, which matches the name of the tool's package */
export type ExtraSectionName = 'vue';

/** Names of all extra sections */
export const EXTRA_SECTIONS = allUnionMembers<ExtraSectionName, {readonly: true}>()(['vue']);

/** Titles of the extra sections, which must match their headings */
export const EXTRA_SECTION_TITLES: Readonly<Record<ExtraSectionName, string>> = {
  vue: 'Vue',
};

/** Default path to the copy of the document in a project */
export const getDocumentPath = (document: DocumentName) => `.agents/${document}.md`;

const getExtraSectionPath = (section: ExtraSectionName) => `.agents/guidelines/${section}.md`;

const getFileUrl = (filePath: string, {raw = false} = {}) =>
  raw
    ? `https://raw.githubusercontent.com/${repository}/${tag}/${filePath}`
    : `https://github.com/${repository}/blob/${tag}/${filePath}`;

/** Link to the document on GitHub, at the git tag of this version of the package */
export const getDocumentUrl = (document: DocumentName, options?: {raw?: boolean}) =>
  getFileUrl(getDocumentPath(document), options);

/**
 * Text for `AGENTS.md` that links the guidelines, by default the raw file on GitHub.
 * The passed extra sections are linked as raw files on GitHub
 */
export const getInstruction = (
  link = getDocumentUrl('guidelines', {raw: true}),
  extraSections: readonly ExtraSectionName[] = [],
) => {
  const links = listFormat.format([
    `[the project guidelines](${link})`,
    ...extraSections.map(
      (section) =>
        `[the ${EXTRA_SECTION_TITLES[section]} guidelines](${getFileUrl(getExtraSectionPath(section), {raw: true})})`,
    ),
  ]);
  return `Before your first response, you MUST read ${links} in full.
Follow them in everything you do, even when you are only answering a question.
`;
};

const readPackageFile = (filePath: string) =>
  fs.readFile(path.join(import.meta.dirname, '..', filePath), 'utf8');

/**
 * Reads the document shipped with the package and adds the source link below its heading.
 * Puts the passed extra sections into the places marked for them, as subsections,
 * and removes the marks of the others
 */
export const readDocument = async (
  document: DocumentName,
  {extraSections = []}: {extraSections?: readonly ExtraSectionName[]} = {},
) => {
  const [content, extraSectionEntries] = await Promise.all([
    readPackageFile(getDocumentPath(document)),
    Promise.all(
      extraSections.map(
        async (section) => [section, await readPackageFile(getExtraSectionPath(section))] as const,
      ),
    ),
  ]);
  const contentByExtraSection = new Map<string, string>(extraSectionEntries);
  return content
    .replace(HEADING_REGEX, (heading) => `${heading}\n\nSource: <${getDocumentUrl(document)}>`)
    .replaceAll(
      EXTRA_SECTION_MARK_REGEX,
      (_mark, section: string, offset: number, wholeContent: string) => {
        const extraSectionContent = contentByExtraSection.get(section);
        if (extraSectionContent == null) {
          return '';
        }

        const parentHeadingLevel =
          wholeContent.slice(0, offset).match(HEADING_LEVEL_REGEX)?.at(-1) || '';
        return `\n\n${extraSectionContent
          .trim()
          .replaceAll(HEADING_LEVEL_REGEX, (level) => `${parentHeadingLevel}${level}`)}`;
      },
    );
};

/** Names of the extra sections that the content of a document has */
export const findExtraSections = (content: string) => {
  const headings = new Set(
    Array.from(content.matchAll(HEADING_TEXT_REGEX), ([, heading]) => heading),
  );
  return EXTRA_SECTIONS.filter((section) => headings.has(EXTRA_SECTION_TITLES[section]));
};
