module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/(*.)(test).js?(x)', '**/(*.)(test).ts?(x)'],
  setupFilesAfterEnv: [
    "<rootDir>/jest-setup.ts"
  ],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  verbose: true,
}
