const path = require('path');
module.exports = {
    rootDir: path.join(__dirname, './tests'),
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    moduleFileExtensions: [
        'js',
        'ts',
        'tsx',
        'json',
        'node',
    ],
    testPathIgnorePatterns: [

    ],
    collectCoverage: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
