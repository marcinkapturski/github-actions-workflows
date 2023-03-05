const config = {
  outputDir: __dirname,
  bail: 0,
  framework: "cucumber",
  reporters: ["spec"],
  cucumberOpts: {
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: "",
    timeout: 900000,
    ignoreUndefinedDefinitions: false,
  },
  autoCompileOpts: {
    babelOpts: {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "16",
            },
          },
        ],
      ],
    },
  },
};

exports.config = config;
