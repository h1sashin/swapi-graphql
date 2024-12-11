module.exports = {
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: { '.ts': ['ts-jest', { isolatedModules: true }] },
  rootDir: 'src',
  collectCoverageFrom: ['**/*.(t|j)s'],
  moduleNameMapper: {
    '@module/(.*)': '<rootDir>/modules/$1',
    '@common/(.*)': '<rootDir>/common/$1',
  },
};
