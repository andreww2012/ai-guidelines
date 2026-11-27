---
"@andreww2012/ai-guidelines": patch
---

Guidelines:

- Added a rule that the user's permission to break the guidelines is one-time, unless it clearly lasts longer
- Added a rule against overusing a colon between a statement and its explanation, like in "The check failed: the cache was stale"
- Added a rule to keep reasons and implementation details out of JSDoc
- Added a rule to write changesets for readers who haven't seen the diff and don't know the project well
- Added a rule against starting a changeset with a list item, which the changelog would show right after the entry's own bullet
- Added exceptions to the hoisting rule for types, values with state and costly values that are rarely needed
- Allowed the `repo` shorthand and excluded compare function parameters like `a`/`b` from the full-word rule
- The issue draft rule now also asks for the report link as a plain URL and for one code block per issue template field
- Made the rules against useless comments, symbol names in comments and docs, verbosity and unneeded exports stricter
- Clarified the rule against staging and committing without permission
