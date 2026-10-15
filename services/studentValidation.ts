import type { Student } from '../types';

type StudentDraft = Omit<Student, 'id'>;

export type StudentErrors = Pick<Record<keyof StudentDraft, string>, 'name' | 'mssv' | 'email'>;

export function validateStudent(input: StudentDraft): { data: StudentDraft; errors: StudentErrors } {
  const data = Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, value.trim()])
  ) as StudentDraft;
  const errors: StudentErrors = { name: '', mssv: '', email: '' };

  if (!data.name) errors.name = 'Tên sinh viên là bắt buộc';
  if (data.mssv.length < 5) errors.mssv = 'MSSV phải tối thiểu 5 ký tự';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Email không hợp lệ';

  return { data, errors };
}
