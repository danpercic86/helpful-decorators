module.exports = {
  roots: ['<rootDir>'],
  displayName: 'Helpful decorators',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  modulePathIgnorePatterns: ["<rootDir>/__tests__/project"],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  clearMocks: true,
  setupFilesAfterEnv: ['./setup-jest-env.js']
};
