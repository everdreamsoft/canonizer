const path = require('path');
module.exports = {
    rootDir: path.join(__dirname, './tests'),
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    moduleFileExtensions: [
        'js',
    ],
    testPathIgnorePatterns: [
    ],
    coveragePathIgnorePatterns: [
    ],
    collectCoverage: false,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
