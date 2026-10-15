import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Student } from '../../types';
import { deleteStudent, getStudentById } from '../../services/api';

export default function StudentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchDetail = useCallback(async () => {
    if (!id) {
      setError('Không có mã sinh viên.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      setStudent(await getStudentById(id));
    } catch (requestError) {
      console.error('Lỗi khi tải chi tiết:', requestError);
      setError('Không thể tải thông tin sinh viên. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const handleDelete = () => {
    if (isDeleting || !id) return;

    Alert.alert('Xác nhận', 'Bạn có muốn xóa sinh viên này không?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đồng ý',
        style: 'destructive',
        onPress: async () => {
          setIsDeleting(true);
          try {
            await deleteStudent(id);
            router.back();
          } catch (requestError) {
            console.error('Lỗi khi xóa:', requestError);
            Alert.alert('Lỗi hệ thống', 'Xóa sinh viên thất bại. Vui lòng thử lại sau.');
            setIsDeleting(false);
          }
        },
      },
    ]);
  };

  if (loading) {
    return <ActivityIndicator accessibilityLabel="Đang tải thông tin sinh viên" color="#007AFF" size="large" style={styles.loading} />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>{error}</Text>
        <Button title="Thử lại" onPress={fetchDetail} accessibilityLabel="Tải lại thông tin sinh viên" />
        <Button title="Quay lại" onPress={() => router.back()} accessibilityLabel="Quay lại danh sách sinh viên" />
      </View>
    );
  }

  if (!student) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Không tìm thấy sinh viên.</Text>
        <Button title="Quay lại" onPress={() => router.back()} accessibilityLabel="Quay lại danh sách sinh viên" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Tên sinh viên</Text>
        <Text style={styles.value}>{student.name}</Text>
        <Text style={styles.label}>MSSV</Text>
        <Text style={styles.value}>{student.mssv}</Text>
        <Text style={styles.label}>Lớp</Text>
        <Text style={styles.value}>{student.lop || '(Không có)'}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{student.email}</Text>
        <Text style={styles.label}>Địa chỉ</Text>
        <Text style={styles.value}>{student.address || '(Không có)'}</Text>
      </View>
      <TouchableOpacity
        accessibilityLabel={`Xóa sinh viên ${student.name}`}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDeleting, busy: isDeleting }}
        disabled={isDeleting}
        onPress={handleDelete}
        style={isDeleting && styles.disabledButton}
      >
        {isDeleting ? <ActivityIndicator color="#FF3B30" /> : <Text style={styles.deleteText}>Xóa sinh viên</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 12 },
  card: { backgroundColor: '#f5f5f5', borderRadius: 10, padding: 16, marginBottom: 24 },
  label: { fontSize: 12, color: '#888', marginTop: 12, textTransform: 'uppercase' },
  value: { fontSize: 16, color: '#111', marginTop: 2 },
  deleteText: { color: '#FF3B30', fontSize: 16, fontWeight: '600', textAlign: 'center', marginTop: 8 },
  message: { textAlign: 'center', color: '#555' },
  loading: { flex: 1 },
  disabledButton: { opacity: 0.6 },
});
