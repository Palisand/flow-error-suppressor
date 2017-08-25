## flow-error-suppressor

This is an alternative to jbreckel's [flow-result-checker](https://github.com/jbreckel/flow-result-checker) for *[flow issue 869](https://github.com/facebook/flow/issues/869) that does not alter the text styling of flow's error output. It expects the **raw** output, which can be provided by using the [script](http://man7.org/linux/man-pages/man1/script.1.html) command.

In _`package.json`_:
```
"scripts": {
  "flow": "script -q /dev/null flow | flow-error-suppressor"
}
```

The output will include the number of errors that have been suppressed:
```
Found 10 errors
     (2 suppressed)
```

\* We should not have to worry about flow errors reported for third party modules (i.e. from _`node_modules`_). However, it is often the case that one cannot simply `[ignore]` a problem module without providing a libdef, which can be very time-consuming if it is not included in [flow-typed](https://github.com/flowtype/flow-typed).
