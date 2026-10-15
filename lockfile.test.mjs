import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const lockfile = JSON.parse(readFileSync(new URL('./package-lock.json', import.meta.url)));
const rootDependencies = lockfile.packages[''].dependencies;

test('lockfile pins Expo Router optional DOM peer to installed React version', () => {
  assert.equal(rootDependencies['react-native-web'], undefined);
  assert.equal(rootDependencies['react-dom'], '19.1.0');
  assert.equal(rootDependencies['@expo/metro-runtime'], undefined);
});
