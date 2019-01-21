module.exports = {
  coverageDirectory: "<rootDir>/coverage",
  testRegex: "((\\.|/)(test|spec))\\.ts$",
  transform: {
    "^.+\\.ts$": "babel-jest",
  },
  testEnvironment: "node",
  // setupFiles: ["jest-localstorage-mock"],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["ts", "js"],
  collectCoverageFrom: ["src/**/*.{ts}"],
};
