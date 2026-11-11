import type {KnipConfig} from 'knip';

export default {
  entry: ['.ncurc.js'], // cspell:disable-line
  ignoreDependencies: [],
  tags: ['-knipignore'],
  treatConfigHintsAsErrors: true,
} satisfies KnipConfig;
