import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import SearchTextInfo from '../components/SearchTextInfo';
export default function ModalScreen(props: any) {
  const {value} = props.route.params;
  const [data,setData] = useState([] as any);
  const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`
  console.log('Search word',value,api)

  useEffect(()=>{
    let isMounted = true;
    (async ()=>{
        await axios.get(api).then(res=>{
            console.log('res',res.data);
            if (res.data) {
            if (isMounted) setData(res.data);
            }
        })
    })();
    return () => {
        isMounted = false;
      };      
},[])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{value}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <SearchTextInfo path="/screens/ModalScreen.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
