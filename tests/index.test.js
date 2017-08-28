const {spawnSync} = require("child_process");
const {resolve} = require("path");

const buildSnapshotTest = (testdir) => {
  test("matches snapshot", () => {
    const {stdout: flowStdout} = spawnSync(
      "script",
      [
        "-q",
        "/dev/null",
        "flow",
        "--show-all-errors",
      ],
      {
        cwd: resolve(__dirname, testdir),
        encoding: "utf8"
      }
    );
    const {status, stderr, stdout} = spawnSync(
      "node",
      ["index.js"],
      {
        encoding: "utf8",
        input: flowStdout
      }
    );
    expect(stderr).toMatchSnapshot();
    expect(stdout).toMatchSnapshot();
    expect(status).toBe(0);
  })
};

[
  "no-errors",
  "package-errors",
  "script-errors"
].map(
  testdir => {
    describe(testdir, () => {
      buildSnapshotTest(testdir)
    })
  }
);
