import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import test from 'node:test';

const require = createRequire(import.meta.url);
const appConfig = require('./app.config.js');

test('Expo config uses existing splash asset and localhost fallback API URL', () => {
  const config = appConfig({ config: {} });

  assert.ok(existsSync(new URL(config.splash.image, import.meta.url)));
  assert.equal(config.slug, 'student-manager-expo');
  assert.equal(config.scheme, 'student-manager-expo');
  assert.equal(config.extra.apiUrl, 'http://localhost:3000');
});
