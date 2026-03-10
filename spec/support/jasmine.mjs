export default {
  spec_dir: "build/tests",
  spec_files: ["**/*[sS]pec.js"],
  helpers: [],
  env: {
    stopSpecOnExpectationFailure: false,
    random: true,
    forbidDuplicateNames: true
  }
};
