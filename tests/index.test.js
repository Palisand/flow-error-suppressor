const {spawnSync} = require("child_process");
const {resolve} = require("path");

const buildTests = (testdir, option = "NONE") => {
  describe(`${testdir} ${option}`, () => {
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
      [
        "index.js",
        ...(option === "NONE" ? [] : [option])
      ],
      {
        encoding: "utf8",
        input: flowStdout
      }
    );

    test("matches snapshot", () => {
      expect(stdout).toMatchSnapshot();
    })

    test("exits correctly", () => {
      expect(status).toBe({
        "no-errors": {
          "-a": 0,
          "--error-on-any": 0,
          "-n": 0,
          "--no-error": 0,
          "NONE": 0,
        },
        "package-errors": {
          "-a": 2,
          "--error-on-any": 2,
          "-n": 0,
          "--no-error": 0,
          "NONE": 0,
        },
        "script-errors": {
          "-a": 2,
          "--error-on-any": 2,
          "-n": 0,
          "--no-error": 0,
          "NONE": 2,
        }
      }[testdir][option]);
    })
  })
};

[
  "no-errors",
  "package-errors",
  "script-errors"
].map(
  testdir => {
    [
      "-a",
      "--error-on-any",
      "-n",
      "--no-error",
      "NONE",
    ].map(
      option => {
        buildTests(testdir, option);
      }
    )
  }
);
