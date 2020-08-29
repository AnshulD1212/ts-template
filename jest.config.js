module.exports = {
  name: "platform-configuration",
  verbose: true,
  preset: "ts-jest",
  roots: ["<rootDir>/tests/unit-test"],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
