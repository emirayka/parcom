const path = require('path')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': path.join(__dirname, '/src/$1'),
  },
}