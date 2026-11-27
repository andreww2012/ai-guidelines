import * as prompts from '@clack/prompts';
import {pathExistsSync} from '../utils.ts';

export class AbortError extends Error {
  constructor(
    // eslint-disable-next-line unicorn/prefer-options-parameter -- Fine
    message = 'Aborted',
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = 'AbortError';
  }
}

export const handleCancel = <Value>(value: Value | typeof prompts.CANCEL_SYMBOL) => {
  if (prompts.isCancel(value)) {
    throw new AbortError();
  }

  return value;
};

export const confirmProjectRoot = async () => {
  if (pathExistsSync('.git')) {
    return;
  }

  const shouldContinue = handleCancel(
    await prompts.confirm({
      message:
        "The current directory has no .git, so it's probably not the project root. Continue anyway?",
      initialValue: false,
    }),
  );
  if (!shouldContinue) {
    throw new AbortError();
  }
};
