module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/'],
  testURL: 'http://localhost/',
  testEnvironment: 'jest-environment-jsdom-fifteen',
  transform: {
    '^.+\\.vue$': '<rootDir>/node_modules/vue-jest',
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest',
    '^.+\\.svg$': '<rootDir>/node_modules/jest-transform-stub',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  transformIgnorePatterns: ['/dist/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: 'testReport/index.html',
        includeFailureMsg: true,
      },
    ],
  ],
};
