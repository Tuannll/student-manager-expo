import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { getStudents, searchStudents } from '../services/api';
import { Student } from '../types';

export default function StudentListScreen() {
  const [students, setStudents] = useState<Student[]>([]);
  const [keyword, setKeyword] = useState('');
  const keywordRef = useRef('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStudents = useCallback(async (search = '') => {
    setLoading(true);
    setError('');
    try {
      setStudents(search.trim() ? await searchStudents(search.trim()) : await getStudents());
    } catch (requestError) {
      console.error('Lỗi khi tải danh sách:', requestError);
      setError('Không thể tải danh sách sinh viên. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchStudents(keywordRef.current);
    }, [fetchStudents])
  );

  const handleKeywordChange = (value: string) => {
    keywordRef.current = value;
    setKeyword(value);
    if (!value.trim()) fetchStudents('');
  };

  if (loading) {
    return <ActivityIndicator accessibilityLabel="Đang tải danh sách sinh viên" size="large" color="#007AFF" style={styles.loading} />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>{error}</Text>
        <Button title="Thử lại" onPress={() => fetchStudents()} accessibilityLabel="Tải lại danh sách sinh viên" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          accessibilityLabel="Từ khóa tìm kiếm sinh viên"
          autoCapitalize="none"
          onChangeText={handleKeywordChange}
          onSubmitEditing={() => fetchStudents()}
          placeholder="Tìm kiếm..."
          returnKeyType="search"
          style={styles.input}
          value={keyword}
        />
        <Button title="Tìm kiếm" onPress={() => fetchStudents()} accessibilityLabel="Tìm kiếm sinh viên" />
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            accessibilityLabel={`Xem sinh viên ${item.name}`}
            accessibilityRole="button"
            onPress={() => router.push(`/detail/${item.id}`)}
            style={styles.item}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>{item.mssv}</Text>
            <Text style={styles.sub}>{item.email}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<Text style={styles.empty}>Không có sinh viên nào.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 12 },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, fontSize: 14 },
  item: { paddingVertical: 12, paddingHorizontal: 8 },
  name: { fontSize: 16, fontWeight: '600', color: '#111' },
  sub: { fontSize: 13, color: '#555', marginTop: 2 },
  separator: { height: 1, backgroundColor: '#eee' },
  empty: { textAlign: 'center', marginTop: 40, color: '#888' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 12 },
  message: { color: '#555', textAlign: 'center' },
  loading: { flex: 1 },
});
