import { readPackageJSON, writeGeneratedFile } from './utils.js';

const { version } = readPackageJSON();
const versionMatch = /^(\d+)\.(\d+)\.(\d+)-?(.*)?$/.exec(version);
if (!versionMatch) {
  throw new Error('Version does not match semver spec: ' + version);
}

const [, major, minor, patch, preReleaseTag] = versionMatch;

const body = `
// Note: This file is autogenerated using "resources/gen-version.js" script and
// automatically updated by "npm version" command.

/**
 * A string containing the version of the @bigschema/test-scaffold library
 */
export const version = '${version}' as string;

/**
 * An object containing the components of the @bigschema/test-scaffold version string
 */
export const versionInfo = Object.freeze({
  major: ${major} as number,
  minor: ${minor} as number,
  patch: ${patch} as number,
  preReleaseTag: ${
    preReleaseTag ? `'${preReleaseTag}'` : 'null'
  } as string | null,
});
`;

writeGeneratedFile('./src/version.ts', body);
