module.exports = {
  coverageDirectory: "<rootDir>/coverage",
  testRegex: "((\\.|/)(test|spec))\\.tsx?$",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["ts", "js", "tsx"],
  collectCoverageFrom: ["**/*.ts", "**/*.tsx"],
  setupFilesAfterEnv: ["<rootDir>/src/setup-tests.js"],
};
