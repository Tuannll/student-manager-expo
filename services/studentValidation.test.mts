import assert from 'node:assert/strict';
import test from 'node:test';
import { validateStudent } from './studentValidation.ts';

test('validateStudent trims valid input before submission', () => {
  const result = validateStudent({
    name: '  Nguyễn Văn An Bình Cường  ',
    mssv: '  12345  ',
    lop: '  64CS  ',
    email: '  an@example.com  ',
    address: '  Hà Nội  ',
  });

  assert.deepEqual(result, {
    errors: { name: '', mssv: '', email: '' },
    data: {
      name: 'Nguyễn Văn An Bình Cường',
      mssv: '12345',
      lop: '64CS',
      email: 'an@example.com',
      address: 'Hà Nội',
    },
  });
});

test('validateStudent enforces assignment length boundaries', () => {
  const invalid = validateStudent({
    name: '1234567890123456789',
    mssv: '1234',
    lop: '',
    email: 'student@example.com',
    address: '',
  });
  const valid = validateStudent({
    name: '12345678901234567890',
    mssv: '12345',
    lop: '',
    email: 'student@example.com',
    address: '',
  });

  assert.equal(invalid.errors.name, 'Tên phải tối thiểu 20 ký tự');
  assert.equal(invalid.errors.mssv, 'MSSV phải tối thiểu 5 ký tự');
  assert.deepEqual(valid.errors, { name: '', mssv: '', email: '' });
});

test('validateStudent follows assignment email rule and allows blank address', () => {
  const missing = validateStudent({ name: 'Nguyễn Văn An Bình Cường', mssv: 'SV001', lop: '', email: ' ', address: '' });
  const invalid = validateStudent({ name: 'Nguyễn Văn An Bình Cường', mssv: 'SV001', lop: '', email: 'invalid', address: '' });
  const valid = validateStudent({ name: 'Nguyễn Văn An Bình Cường', mssv: 'SV001', lop: '', email: 'a@b', address: '' });

  assert.equal(missing.errors.email, 'Email là bắt buộc');
  assert.equal(invalid.errors.email, 'Email không hợp lệ');
  assert.equal(valid.errors.email, '');
  assert.equal(valid.data.address, '');
});
