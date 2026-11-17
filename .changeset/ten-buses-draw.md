---
"@andreww2012/ai-guidelines": patch
---

Guidelines:

- Added a rule for explaining guideline violations
- Added a rule for leaving sensitive environment details out of issues
- Added a rule against a full stop at the end of commit bodies
- Suggested commit messages with a body now come in two code blocks: the header only and the full message
- The machine's free resources are now checked before any non-trivial command
- Types are now preferred over `Object.freeze` for read-only values
- Moving code into a variable just to narrow a tool comment is now discouraged
