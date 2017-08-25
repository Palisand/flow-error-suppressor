#!/usr/bin/env node
/* eslint-disable no-undef */

const stdoutChunks = [];

module.exports = {

  accumulate: stdout => {
    stdoutChunks.push(stdout);
  },

  process: () => {
    // split flow output into error strings
    const errors = stdoutChunks.join("").split(/\r\n\u001b\[0m\u001b\[0m\r\n\u001b\[0m/);

    // filter out errors from node_modules
    const errors_filtered = errors.filter(
      error => error && !error.split(/\r\n/)[0].includes("node_modules")
    );

    // display filtered errors
    process.stdout.write(
      errors_filtered.join("\r\n\u001b[0m\u001b[0m\r\n\u001b[0m")
    );

    // display error counts
    if (errors_filtered.length > 0) {
      const num_errors_suppressed = errors.length - errors_filtered.length;
      process.stdout.write(
        `      ${num_errors_suppressed} suppressed\n` +
        `      ${errors.length - num_errors_suppressed - 1} shown\n\n`
      );
    }
  },

};
