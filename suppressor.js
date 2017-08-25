#!/usr/bin/env node
/* eslint-disable no-undef */

const stdoutChunks = [];

module.exports = {

  accumulate: stdout => {
    stdoutChunks.push(stdout);
  },

  process: () => {
    const errors = stdoutChunks.join("").split(/\r\n\u001b\[0m\u001b\[0m\r\n\u001b\[0m/);

    const errors_filtered = errors.filter(
      error => error && !error.includes("node_modules")
    );

    process.stdout.write(
      errors_filtered.join("\r\n\u001b[0m\u001b[0m\r\n\u001b[0m")
    );

    if (errors_filtered.length > 0) {
      process.stdout.write(
        `     (${errors.length - errors_filtered.length} suppressed)\n`
      );
    }
  },

};
