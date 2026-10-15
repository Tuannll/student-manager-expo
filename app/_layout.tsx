import { Stack, router } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';

// Layout gốc — bọc toàn bộ app, định nghĩa kiểu navigation là Stack (màn hình chồng lên nhau)
export default function RootLayout() {
  return (
    // Stack giống như một chồng bài: mở màn hình mới = thêm bài lên trên, back = bỏ bài trên cùng
    <Stack>
      {/* Màn hình danh sách sinh viên */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Danh Sách Sinh Viên',
          // headerRight: nút hiển thị bên phải của thanh header
          headerRight: () => (
            <TouchableOpacity
              accessibilityLabel="Thêm sinh viên"
              accessibilityRole="button"
              onPress={() => router.push('/add')}
            >
              {/* router.push('/add') = điều hướng sang màn hình add.tsx */}
              <Text style={{ fontSize: 28, fontWeight: 'bold', marginRight: 12, color: '#007AFF' }}>
                +
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      {/* Màn hình chi tiết — [id] là tham số động, ví dụ /detail/1, /detail/2 */}
      <Stack.Screen
        name="detail/[id]"
        options={{ title: 'Chi Tiết Sinh Viên' }}
      />
      {/* Màn hình thêm mới */}
      <Stack.Screen
        name="add"
        options={{ title: 'Thêm Mới Sinh Viên' }}
      />
    </Stack>
  );
}