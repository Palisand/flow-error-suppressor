#!/usr/bin/env node
/**
 * Suppresses any flow errors arising from `node_modules`
 */

const suppressor = require("./suppressor");

process.stdin.setEncoding("utf8");
process.stdin.on("data", stdout => suppressor.accumulate(stdout));
process.stdin.on("end", () => suppressor.process());
