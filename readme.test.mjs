import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const readme = readFileSync(new URL('./README.md', import.meta.url), 'utf8');

test('README documents bundled backend and supported environments', () => {
  assert.match(readme, /Tuannll\/student-manager-expo/);
  assert.match(readme, /README\.vi\.md/);
  assert.match(readme, /npm ci --prefix mock-backend/);
  assert.match(readme, /npm start --prefix mock-backend/);
  assert.match(readme, /EXPO_PUBLIC_API_URL/);
  assert.match(readme, /10\.0\.2\.2:3000/);
  assert.doesNotMatch(readme, /Expo Web/);
  assert.match(readme, /\| `GET` \| `\/students` \|/);
  assert.match(readme, /npm run typecheck/);
});
