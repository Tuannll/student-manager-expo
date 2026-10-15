import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('./mock-backend/', import.meta.url);

test('repository bundles a valid student mock backend', () => {
  assert.ok(existsSync(new URL('package.json', root)), 'mock-backend/package.json is missing');
  assert.ok(existsSync(new URL('server.js', root)), 'mock-backend/server.js is missing');
  assert.ok(existsSync(new URL('db.json', root)), 'mock-backend/db.json is missing');

  const database = JSON.parse(readFileSync(new URL('db.json', root), 'utf8'));
  assert.deepEqual(Object.keys(database), ['students']);
  assert.ok(database.students.length >= 3);
  for (const student of database.students) {
    assert.equal(typeof student.id, 'string');
    assert.ok(student.name.trim().length >= 20);
    assert.ok(student.mssv.trim().length >= 5);
    assert.ok(student.email.includes('@'));
  }
});
