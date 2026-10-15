import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));
const require = createRequire(import.meta.url);
const appConfig = require('./app.config.js');

test('mobile-only project does not expose Expo web commands or config', () => {
  assert.equal(packageJson.scripts.web, undefined);
  assert.equal(appConfig({ config: {} }).web, undefined);
});
