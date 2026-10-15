// Định nghĩa "khuôn" cho dữ liệu sinh viên — mọi nơi trong app đều dùng type này
export type Student = {
  id: string;       // ID duy nhất, do server tự tạo
  name: string;     // Họ và tên
  mssv: string;     // Mã số sinh viên
  lop?: string;     // Lớp — dấu ? nghĩa là có thể để trống
  email: string;    // Email
  address?: string; // Địa chỉ — cũng có thể để trống
};
