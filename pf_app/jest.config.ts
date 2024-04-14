import type {Config} from 'jest';

const config: Config = {
	verbose: true,
	detectOpenHandles: true,
	silent: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/*.spec.ts']
};

export default config;