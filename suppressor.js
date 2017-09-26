#!/usr/bin/env node
/* eslint-disable no-undef */

const stdoutChunks = [];
const JOIN_SEPARATOR = "\r\n\u001b[0m\u001b[0m\r\n\u001b[0m"
const SPLIT_SEPARATORS = [
  "\\r\\n\\u001b\\[0m\\u001b\\[0m\\r\\n\\u001b\\[0m",
  "\\r\\n\\u001b\\[0m\\u001b\\[0m\\r\\r\\n\\u001b\\[0m",  // double carriage return
]

module.exports = {

  accumulate: stdout => {
    stdoutChunks.push(stdout);
  },

  process: () => {
    // split flow output into error strings and summary string
    const stdoutSplit = stdoutChunks.join("").split(new RegExp(SPLIT_SEPARATORS.join("|")));
    const errors = stdoutSplit.slice(0, -1)
    const defaultErrorSummary = stdoutSplit[stdoutSplit.length - 1]

    // filter out errors from node_modules
    const errorsShown = errors.filter(
      error => error && !error.split(/\r\n/)[0].includes("node_modules")
    );

    // display unsuppressed errors, if any
    if (errorsShown.length > 0) {
      process.stdout.write(
        errorsShown.join(JOIN_SEPARATOR)
      );
    };

    // display summary
    process.stdout.write(
      (errorsShown.length > 0 ? JOIN_SEPARATOR : "") + defaultErrorSummary
    );

    // display error counts
    if (errors.length > 0) {
      const numErrorSuppressed = errors.length - errorsShown.length;
      process.stdout.write(
        `      ${numErrorSuppressed} suppressed\n` +
        `      ${errors.length - numErrorSuppressed } shown\n\n`
      );
    }

    // determine exit code
    switch (process.argv[2]) {
      case "-a":
      case "--error-on-any":
        process.exit(errors.length > 0 ? 2 : 0);
      case "-n":
      case "--no-error":
        process.exit(0);
      default:
        process.exit(errorsShown.length > 0 ? 2 : 0);
    }

  },

};
