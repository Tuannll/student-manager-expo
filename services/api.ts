import Constants from 'expo-constants';
import axios from 'axios';
import { Student } from '../types';

const baseUrl = Constants.expoConfig?.extra?.apiUrl;

if (typeof baseUrl !== 'string' || !/^https?:\/\/.+/.test(baseUrl)) {
  throw new Error('Thiếu expo.extra.apiUrl hợp lệ trong app.json');
}

const BASE_URL = baseUrl.replace(/\/$/, '');

// Lấy toàn bộ danh sách sinh viên — GET /students
export const getStudents = async (): Promise<Student[]> => {
  const res = await axios.get(`${BASE_URL}/students`);
  return res.data; // res.data là mảng Student[] trả về từ server
};
  
// Tìm kiếm sinh viên theo từ khóa — GET /students?search=keyword
export const searchStudents = async (keyword: string): Promise<Student[]> => {
  const res = await axios.get(`${BASE_URL}/students`, {
    params: { search: keyword }, // axios tự chuyển object này thành ?search=keyword trên URL
  });
  return res.data;
};

// Lấy chi tiết 1 sinh viên theo id — GET /students/:id
export const getStudentById = async (id: string): Promise<Student> => {
  const res = await axios.get(`${BASE_URL}/students/${id}`);
  return res.data; // res.data là 1 object Student
};

// Tạo sinh viên mới — POST /students
// Omit<Student, 'id'> nghĩa là truyền tất cả trường của Student TRỪ id (vì server tự tạo id)
export const createStudent = async (
  data: Omit<Student, 'id'>
): Promise<Student> => {
  const res = await axios.post(`${BASE_URL}/students`, data);
  return res.data; // Server trả về sinh viên vừa tạo (có id)
};

// Xóa sinh viên theo id — DELETE /students/:id
export const deleteStudent = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/students/${id}`);
  // Không cần return gì — server chỉ trả về status 200/204
};