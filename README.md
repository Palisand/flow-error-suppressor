## flow-error-suppressor

This is an alternative to jbreckel's [flow-result-checker](https://github.com/jbreckel/flow-result-checker) for *[flow issue 869](https://github.com/facebook/flow/issues/869) that does not alter the text styling of flow's error output and does not have any dependencies, so to speak: It expects the **raw** output, which can be provided by using the [script](http://man7.org/linux/man-pages/man1/script.1.html) command. This has been tested **only** on OS X.

In _`package.json`_:
```
"scripts": {
  "flow": "script -q /dev/null flow --show-all-errors | flow-error-suppressor"
}
```

The output will include the number of errors that are shown and that have been suppressed:
```
Found 10 errors
      2 suppressed
      8 shown
```

\*We should not have to worry about flow errors reported for third party modules (i.e. from _`node_modules`_). However, it is often the case that one cannot simply `[ignore]` a problem module without having provided a libdef, which can be very time-consuming if it is not included in [flow-typed](https://github.com/flowtype/flow-typed).

### Options

By default, **only unsuppressed errors** will result in an exit status of 2.

`-a` `--error-on-any`

Exit with 2 if there are any flow errors, regardless of origin.

`-n` `--no-error`

Always exit with 0. This is useful if you don't want `npm run flow` to have that ["stupid npm error"](https://github.com/npm/npm/issues/6124) and if you want to pass arguments to `flow` at the same time (i.e. no more `|| true` or `; exit 0` getting in the way).

All but the first option provided will be ignored.
