import {eslintConfig} from 'eslint-config-un';
import {forbidImportingFromUtilityLibraries} from 'eslint-config-un/snippets';
import oxfmtConfig from './oxfmt.config.ts';

export default eslintConfig({
  ignores: ['CHANGELOG.md'],
  mode: 'lib',
  defaultConfigsStatus: 'misc-enabled',
  configs: {
    eslintComments: {
      requireDescriptions: true,
    },
    format: {
      files: [],
      configFencedCodeBlocks: {
        formatter: [
          'oxfmt',
          {
            bracketSpacing: oxfmtConfig.bracketSpacing,
            printWidth: oxfmtConfig.printWidth,
            singleQuote: oxfmtConfig.singleQuote,
          },
        ],
      },
    },
    import: {
      extraneousDependenciesCheck: {
        // Bundled
        whitelist: ['utilery'],
      },
      requireModuleExtensions: true,
    },
    markdown: {
      configSentencesPerLine: true,
    },
    nodeDependencies: {
      enforceAbsoluteVersion: true,
    },
    un: {
      overrides: {
        'un/no-type-assertion': 2,
        'un/prefer-array-for-each': 2,
        'un/prefer-logical-or': 2,
      },
    },
    vitest: {
      vitestGlobalsImporting: 'disallow',
    },
  },
  extraConfigs: [
    {
      name: 'forbid-utility-package-imports',
      ignores: ['src/utils.ts'],
      rules: {
        'no-restricted-imports': [
          2,
          {
            patterns: [
              forbidImportingFromUtilityLibraries({
                packageNames: {utilery: true},
                message:
                  'Please do not use this package directly, import utilities from `src/utils.ts` instead',
              }),
            ],
          },
        ],
      },
    },
  ],
});
