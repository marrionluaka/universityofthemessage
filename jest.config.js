module.exports = {
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  watchman: false,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    // this line is optional and the tilde shortcut
    // will not be used in this tutorial
    '^~/(.*)$': '<rootDir>/$1'
  },
  modulePathIgnorePatterns: ['<rootDir>/test/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!vuex-composition-helpers/dist)'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },

  collectCoverageFrom: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'lib/**/*.ts',
    'plugins/**/*.ts',
    'store/**/*.ts'
  ]
};
