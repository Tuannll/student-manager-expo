import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const readme = readFileSync(new URL('./README.md', import.meta.url), 'utf8');

test('README documents local backend setup for all supported environments', () => {
  assert.match(readme, /EXPO_PUBLIC_API_URL/);
  assert.match(readme, /10\.0\.2\.2:3000/);
  assert.match(readme, /cùng Wi-Fi/i);
  assert.doesNotMatch(readme, /Expo Web/);
  assert.match(readme, /\| `GET` \| `\/students` \|/);
  assert.match(readme, /npm run typecheck/);
});
