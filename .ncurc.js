// @ts-check
import {ncuConfig} from '@andreww2012/npm-check-updates-config';

export default ncuConfig({
  cwd: import.meta.dirname,
  targets: {
    // Their `latest` dist-tag lags behind the prerelease channel we follow
    'eslint-config-un': 'greatest',
  },
});
