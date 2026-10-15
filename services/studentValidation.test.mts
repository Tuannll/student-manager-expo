import assert from 'node:assert/strict';
import test from 'node:test';
import { validateStudent } from './studentValidation.ts';

test('validateStudent trims valid input before submission', () => {
  const result = validateStudent({
    name: '  Nguyễn Văn An  ',
    mssv: '  12345  ',
    lop: '  64CS  ',
    email: '  an@example.com  ',
    address: '  Hà Nội  ',
  });

  assert.deepEqual(result, {
    errors: { name: '', mssv: '', email: '' },
    data: {
      name: 'Nguyễn Văn An',
      mssv: '12345',
      lop: '64CS',
      email: 'an@example.com',
      address: 'Hà Nội',
    },
  });
});

test('validateStudent reports required fields and invalid email', () => {
  const result = validateStudent({ name: ' ', mssv: '123', lop: '', email: 'invalid', address: '' });

  assert.equal(result.errors.name, 'Tên sinh viên là bắt buộc');
  assert.equal(result.errors.mssv, 'MSSV phải tối thiểu 5 ký tự');
  assert.equal(result.errors.email, 'Email không hợp lệ');
});
