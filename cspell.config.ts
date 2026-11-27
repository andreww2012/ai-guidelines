import {cspellConfig} from '@andreww2012/cspell-config';

export default cspellConfig({
  cwd: import.meta.dirname,
  ignorePaths: ['.agents/guidelines.md'],
  words: {
    names: ['andreww', 'cleye', 'utilery', 'worktrees'],
    misc: ['knipignore', 'vulns'],
  },
});
