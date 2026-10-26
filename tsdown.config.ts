import {defineConfig} from 'tsdown';
import {exec, invariant} from './src/utils.ts';

const documentsCommitHash = (
  await exec('git', ['log', '-1', '--format=%H', '--', '.agents'])
).stdout.trim();

invariant(documentsCommitHash, 'Could not find the last commit that changed the documents');

export default defineConfig({
  entry: ['src/cli.ts', 'src/index.ts'],
  env: {DOCUMENTS_COMMIT_HASH: documentsCommitHash},
});
