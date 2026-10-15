import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const workflow = readFileSync(new URL('./.github/workflows/ci.yml', import.meta.url), 'utf8');

test('CI validates mobile app and bundled backend', () => {
  assert.match(workflow, /npm ci/);
  assert.match(workflow, /npm ci --prefix mock-backend/);
  assert.match(workflow, /npm test/);
  assert.match(workflow, /npm run typecheck/);
  assert.match(workflow, /npm run check --prefix mock-backend/);
  assert.match(workflow, /npm run smoke --prefix mock-backend/);
  assert.match(workflow, /pull_request/);
});
