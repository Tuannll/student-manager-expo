import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import test from 'node:test';

const tracked = execFileSync('git', ['ls-files'], { encoding: 'utf8' });

test('public repository does not track private config or dependencies', () => {
  assert.doesNotMatch(tracked, /(^|\n)(\.env|node_modules\/|\.claude\/|AGENTS\.md|CLAUDE\.md)(\n|$)/);
});
