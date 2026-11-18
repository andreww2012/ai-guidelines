# @andreww2012/ai-guidelines

## 0.2.11

### Patch Changes

- [`680d5e5`](https://github.com/andreww2012/ai-guidelines/commit/680d5e58158b38ead9a295c45850f0cf894318ed) - Guidelines:
  
  - The exception to the "one sentence per line" rule now covers any text shown with real line breaks, like issue/PR templates
  - Added a rule against treating linter rules as a source of truth
  - Notes saved to `AGENTS.md` must now be generic and short
  - The whole `.agents` and `.claude` directories are now checked for instructions, not only the skills in them
  - During mass dependency updates, clarified that only the updates may now be committed without being asked

## 0.2.10

### Patch Changes

- [`aa17dd1`](https://github.com/andreww2012/ai-guidelines/commit/aa17dd1f0f4d8de89ff6adea63d795ed9d9b1c47) - Guidelines: clarified several rules and merged repeated ones

- [`97eb552`](https://github.com/andreww2012/ai-guidelines/commit/97eb5523cca472c58bf822077582a6f015708493) - Guidelines:
  
  - Added a rule for explaining guideline violations
  - Added a rule for leaving sensitive environment details out of issues
  - Added a rule against a full stop at the end of commit bodies
  - Suggested commit messages with a body now come in two code blocks: the header only and the full message
  - The machine's free resources are now checked before any non-trivial command
  - Types are now preferred over `Object.freeze` for read-only values
  - Moving code into a variable just to narrow a tool comment is now discouraged

## 0.2.9

### Patch Changes

- [`82d7b1e`](https://github.com/andreww2012/ai-guidelines/commit/82d7b1ed87be2488e642c47acbbdb5d63397219d) - Guidelines: added rules for checking the machine's free resources before running QA tools, starting the reason in tool comments with an uppercase letter and not disabling overly strict lint rules globally; `w/` and `w/o` are now allowed shorthands

## 0.2.8

### Patch Changes

- [`1675ee5`](https://github.com/andreww2012/ai-guidelines/commit/1675ee59adffda0e9b72604afc9f8ce047f4e07a) - Guidelines: made more clear that tool-specific comments must cover only the code that causes the report

- [`48f528b`](https://github.com/andreww2012/ai-guidelines/commit/48f528b6fd56d979dab5301b13c5fffa7013793d) - Guidelines: added rules for backticks around technical names, mutating array methods like `.sort()`, `as const`, type parameter names, type guards and the delimiter before the reason in tool comments; removed the test data rule

## 0.2.7

### Patch Changes

- [`00496e7`](https://github.com/andreww2012/ai-guidelines/commit/00496e7aca7d1385a2f8e5963f24dbf6b3620547) - Guidelines: added rules for tool-specific comments, test data, full-word names, suggested commit messages, the past tense in changesets and the writing style on the hosting platform

## 0.2.6

### Patch Changes

- [`4f93cde`](https://github.com/andreww2012/ai-guidelines/commit/4f93cde09a96024764e3cb0dafb017b414a9631c) - Guidelines: `char` and `impl` are now allowed shorthands

- [`d94bfc0`](https://github.com/andreww2012/ai-guidelines/commit/d94bfc0ad1e709a1869a83439d91abe180d2baa1) - Guidelines: added rules for updating dependencies, big files, regression tests, `.json` imports, curly quotes and text that only makes sense with the session context; issue drafts now follow the hosting platform rules and include a link for reporting

## 0.2.5

### Patch Changes

- [`a116125`](https://github.com/andreww2012/ai-guidelines/commit/a11612579bd5457af03355cd85b89accac1a6ae8) - Guidelines: wrapped block comments like `<!-- ... -->` now keep their markers on the text lines, and comments for tools, like `eslint-disable-next-line` or `cspell:ignore`, no longer have to fit the max line length

- [`2d55fa5`](https://github.com/andreww2012/ai-guidelines/commit/2d55fa502237f6345ee7f1be3e1330ad58151285) - Guidelines: added a rule against the ellipsis character, and the rule against staging changes now also covers side effects, like those of `git mv` and `git rm`

- [`042220b`](https://github.com/andreww2012/ai-guidelines/commit/042220bd59a57d7c1dd75284fccbdb470160eac7) - Guidelines: added rules for empty string checks, units in names, utility packages, agent memory, CI-only tools, Tailwind classes, `undefined` inline snapshots, comments at the root of Vue templates and wrapping dynamic text

## 0.2.4

### Patch Changes

- [`2fd74b1`](https://github.com/andreww2012/ai-guidelines/commit/2fd74b16145fb2e9cde2c252c56faf3e224dd4fa) - Guidelines: added rules for concurrent `await`s, the mood of commit headers, full stops in changesets, `required` in Vue runtime props and found upstream bugs, plus tips on using `: Readonly<T>` instead of `as const satisfies T` and on CONSTANT_CASE in plain JS files

## 0.2.3

### Patch Changes

- [`70f129d`](https://github.com/andreww2012/ai-guidelines/commit/70f129dfdc9907cca3878156e678e554bab1a66f) - Guidelines: CONSTANT_CASE is now also allowed for `RegExp`s and for `Set`s and `Map`s typed as `ReadonlySet` and `ReadonlyMap`

## 0.2.2

### Patch Changes

- [`a97e3d0`](https://github.com/andreww2012/ai-guidelines/commit/a97e3d0d4666fd87fee8b4381f72d425d14b2b43) - Guidelines: commit messages are now checked with the project's commit linter, one-off binaries are run through the project's package manager, and checks are limited to changed files

- [`d5bbd58`](https://github.com/andreww2012/ai-guidelines/commit/d5bbd582d02d1c70342e921b6f2641a368a53a98) - Guidelines: added a rule against whitespace at the start and end of element text in Vue templates

- [`b54cba1`](https://github.com/andreww2012/ai-guidelines/commit/b54cba168490cbdc3624cf3af7111efa37f4a833) - Guidelines: added rules for type annotations, `forEach`, conditional spreads and query parameter names; reworked the CONSTANT_CASE rule

## 0.2.1

### Patch Changes

- [`9b21d84`](https://github.com/andreww2012/ai-guidelines/commit/9b21d845df42de25af39def79787ff0705399668) - Guidelines: added new rules for frontend URLs, npm links, package patches, changesets and more

## 0.2.0

### Minor Changes

- [`40d6463`](https://github.com/andreww2012/ai-guidelines/commit/40d646335849279d3f9c471618a661853c16a1e8) - The package now has a programmatic API. `setupGuidelines` and `updateDocument` do the same as the CLI commands, but don't ask questions. Helpers like `readDocument` and `getDocumentUrl` are exported too, as well as `documentsCommitHash`, the hash of the last commit that changed the documents. Links to the documents now point to the git tag of the package version instead of a commit

- [`c0a3341`](https://github.com/andreww2012/ai-guidelines/commit/c0a3341b0688d1c75d5252b7df01a2caf12762ca) - `getInstruction` is now exported. It returns the text that links the guidelines from `AGENTS.md`: to the file on GitHub by default, or to your own link

### Patch Changes

- [`e4fcf62`](https://github.com/andreww2012/ai-guidelines/commit/e4fcf62a8517d86caedaef873b15dad628785bd7) - Guidelines: changesets should not use the imperative mood

## 0.1.0

### Minor Changes

- [`ee755d4`](https://github.com/andreww2012/ai-guidelines/commit/ee755d48ec4b1f4bf1ca197498c2eab48cc757d7) - First release: a CLI to set up the guidelines in your project. Run `pnpm dlx @andreww2012/ai-guidelines setup` in the project root to link them from `AGENTS.md`, and `pnpm dlx @andreww2012/ai-guidelines update guidelines` to update your copy
