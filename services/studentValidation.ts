import type { Student } from '../types';

type StudentDraft = Omit<Student, 'id'>;

export type StudentErrors = Pick<Record<keyof StudentDraft, string>, 'name' | 'mssv' | 'email'>;

export function validateStudent(input: StudentDraft): { data: StudentDraft; errors: StudentErrors } {
  const data = Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, value.trim()])
  ) as StudentDraft;
  const errors: StudentErrors = { name: '', mssv: '', email: '' };

  if (data.name.length < 20) errors.name = 'Tên phải tối thiểu 20 ký tự';
  if (data.mssv.length < 5) errors.mssv = 'MSSV phải tối thiểu 5 ký tự';
  if (!data.email) errors.email = 'Email là bắt buộc';
  else if (!data.email.includes('@')) errors.email = 'Email không hợp lệ';

  return { data, errors };
}
