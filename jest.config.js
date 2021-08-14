module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  testMatch: ['<rootDir>/src/**/**.test.ts'],
  setupFiles: ['./jest-setup-file.ts'],
};
