import { StyleSheet,TouchableOpacity } from 'react-native';

import EditScreenInfoVi from '../components/EditScreenInfoVi';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
export default function TabThreeScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>
      Dictionary
      Từ điển trực tuyến miễn phí cho người Việt
      Cung cấp 2 bộ từ điển chính: Anh – Việt, và Anh – Anh
      Kho từ đồ sộ cùng hệ thống gợi ý từ thông minh,giúp tra cứu nhanh chóng nhất.
      </Text>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text style={styles.linkText}>Click here to get back!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EA82EA'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
