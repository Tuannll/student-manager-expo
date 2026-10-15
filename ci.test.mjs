import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const workflow = readFileSync(new URL('./.github/workflows/ci.yml', import.meta.url), 'utf8');

test('CI installs locked dependencies and runs tests plus typecheck', () => {
  assert.match(workflow, /npm ci/);
  assert.match(workflow, /npm test/);
  assert.match(workflow, /npm run typecheck/);
  assert.match(workflow, /pull_request/);
});
