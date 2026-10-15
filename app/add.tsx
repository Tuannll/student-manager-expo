import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { createStudent } from '../services/api';
import { StudentErrors, validateStudent } from '../services/studentValidation';

const emptyErrors: StudentErrors = { name: '', mssv: '', email: '' };

export default function AddStudentScreen() {
  const [name, setName] = useState('');
  const [mssv, setMssv] = useState('');
  const [lop, setLop] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<StudentErrors>(emptyErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearError = (field: keyof StudentErrors) => {
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleSave = async () => {
    const result = validateStudent({ name, mssv, lop, email, address });
    setErrors(result.errors);
    if (Object.values(result.errors).some(Boolean)) return;

    setIsSubmitting(true);
    try {
      await createStudent(result.data);
      router.back();
    } catch (requestError) {
      console.error('Lỗi khi tạo sinh viên:', requestError);
      Alert.alert('Lỗi', 'Không thể lưu thông tin sinh viên lúc này. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    Alert.alert('Xác nhận', 'Bạn có muốn bỏ thêm mới không?', [
      { text: 'Không', style: 'cancel' },
      { text: 'Đồng ý', onPress: () => router.back() },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.container}>
      <Text style={styles.fieldLabel}>Tên sinh viên *</Text>
      <TextInput
        accessibilityLabel="Tên sinh viên"
        editable={!isSubmitting}
        onChangeText={(value) => { setName(value); clearError('name'); }}
        placeholder="Tên sinh viên"
        style={[styles.input, errors.name ? styles.inputError : null]}
        value={name}
      />
      {errors.name ? <Text accessibilityLiveRegion="polite" style={styles.errorText}>{errors.name}</Text> : null}

      <Text style={styles.fieldLabel}>MSSV *</Text>
      <TextInput
        accessibilityLabel="MSSV"
        editable={!isSubmitting}
        onChangeText={(value) => { setMssv(value); clearError('mssv'); }}
        placeholder="MSSV (tối thiểu 5 ký tự)"
        style={[styles.input, errors.mssv ? styles.inputError : null]}
        value={mssv}
      />
      {errors.mssv ? <Text accessibilityLiveRegion="polite" style={styles.errorText}>{errors.mssv}</Text> : null}

      <Text style={styles.fieldLabel}>Lớp</Text>
      <TextInput accessibilityLabel="Lớp" editable={!isSubmitting} onChangeText={setLop} placeholder="Lớp (ví dụ: 64CS)" style={styles.input} value={lop} />

      <Text style={styles.fieldLabel}>Email *</Text>
      <TextInput
        accessibilityLabel="Email"
        autoCapitalize="none"
        editable={!isSubmitting}
        keyboardType="email-address"
        onChangeText={(value) => { setEmail(value); clearError('email'); }}
        placeholder="Email"
        style={[styles.input, errors.email ? styles.inputError : null]}
        value={email}
      />
      {errors.email ? <Text accessibilityLiveRegion="polite" style={styles.errorText}>{errors.email}</Text> : null}

      <Text style={styles.fieldLabel}>Địa chỉ</Text>
      <TextInput accessibilityLabel="Địa chỉ" editable={!isSubmitting} onChangeText={setAddress} placeholder="Địa chỉ (tùy chọn)" style={styles.input} value={address} />

      <TouchableOpacity
        accessibilityLabel="Lưu sinh viên"
        accessibilityRole="button"
        accessibilityState={{ disabled: isSubmitting, busy: isSubmitting }}
        disabled={isSubmitting}
        onPress={handleSave}
        style={[styles.saveBtn, isSubmitting && styles.disabledButton]}
      >
        {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Lưu lại</Text>}
      </TouchableOpacity>

      <TouchableOpacity
        accessibilityLabel="Hủy thêm sinh viên"
        accessibilityRole="button"
        accessibilityState={{ disabled: isSubmitting }}
        disabled={isSubmitting}
        onPress={handleCancel}
        style={[styles.cancelBtn, isSubmitting && styles.disabledButton]}
      >
        <Text style={styles.cancelBtnText}>Hủy bỏ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 40 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: '#333', marginTop: 16, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, backgroundColor: '#fafafa' },
  inputError: { borderColor: '#FF3B30' },
  errorText: { color: '#FF3B30', fontSize: 12, marginTop: 4 },
  saveBtn: { backgroundColor: '#007AFF', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 32 },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cancelBtn: { borderWidth: 1, borderColor: '#FF3B30', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  cancelBtnText: { color: '#FF3B30', fontSize: 16, fontWeight: '600' },
  disabledButton: { opacity: 0.6 },
});
