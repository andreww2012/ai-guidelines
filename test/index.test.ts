import fs from 'node:fs/promises';
import path from 'node:path';
import {findExtraSections} from '../src/documents.ts';
import {EXTRA_SECTIONS, getInstruction, readDocument} from '../src/index.ts';

const LEADING_SPACES_REGEX = /^ +/gm;

const HEADING_REGEX = /^#+ .+$/gm;

const SEVERAL_BLANK_LINES_REGEX = /\n{3}/;

const readProjectFile = (fileName: string) =>
  fs.readFile(path.join(import.meta.dirname, '..', fileName), 'utf8');

describe('getInstruction', () => {
  it('matches the instruction in AGENTS.md', async () => {
    await expect(readProjectFile('AGENTS.md')).resolves.toContain(
      getInstruction('./.agents/guidelines.md').trimEnd(),
    );
  });

  it('matches the examples in README.md', async () => {
    // Some examples are indented inside list items
    const readme = (await readProjectFile('README.md')).replaceAll(LEADING_SPACES_REGEX, '');

    expect(readme).toContain(getInstruction('./.agents/guidelines.md'));
    expect(readme).toContain(
      getInstruction(
        'https://raw.githubusercontent.com/andreww2012/ai-guidelines/@andreww2012/ai-guidelines@VERSION/.agents/guidelines.md',
      ),
    );
  });
});

describe('readDocument', () => {
  it('puts the extra sections into the places marked for them', async () => {
    const headings = (await readDocument('guidelines', {extraSections: ['vue']})).match(
      HEADING_REGEX,
    );
    const vueHeadingIndex = headings?.indexOf('#### Vue') ?? -1;

    expect(headings?.slice(vueHeadingIndex - 1, vueHeadingIndex + 2)).toStrictEqual([
      '### Frontend',
      '#### Vue',
      '## Workflow',
    ]);
  });

  it('removes the marks of the extra sections without leaving extra blank lines', async () => {
    const guidelines = await Promise.all([
      readDocument('guidelines'),
      readDocument('guidelines', {extraSections: EXTRA_SECTIONS}),
    ]);

    guidelines.forEach((content) => {
      expect(content).not.toContain('<!-- ai-guidelines section:');
      expect(content).not.toMatch(SEVERAL_BLANK_LINES_REGEX);
    });
  });
});

describe('findExtraSections', () => {
  it('finds the extra sections added to the guidelines', async () => {
    await expect(readDocument('guidelines').then(findExtraSections)).resolves.toStrictEqual([]);
    await expect(
      readDocument('guidelines', {extraSections: EXTRA_SECTIONS}).then(findExtraSections),
    ).resolves.toStrictEqual(EXTRA_SECTIONS);
  });
});
