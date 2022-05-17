import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, ActivityIndicator } from 'react-native';

import { Text, View } from '../components/Themed';
import SearchTextInfo from '../components/SearchTextInfo';
import wordData from '../words.json';
export default function ModalScreen(props: any) {
  const { value } = props.route.params;
  const [data, setData] = useState([] as any);
  const [title, setTitle] = useState(value);
  const [isMounted, setMounted] = useState(true);
  let api = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`
  useEffect(() => {
    
    if (value == 'randomWord') {
      var item = wordData[Math.floor(Math.random() * wordData.length)];
      setTitle(item);

      let api = `https://api.dictionaryapi.dev/api/v2/entries/en/${item}`;
      (async () => {
        await axios.get(api).then(res => {
          if (res.data) {
            if (isMounted) {setData(res.data);setMounted(false)}
          }
        })
      })();
    }
    else if (value == 'wordOfTheDay'){
      let num = 3333;
      var item = wordData[num];
      setTitle(item);

      let api = `https://api.dictionaryapi.dev/api/v2/entries/en/${item}`; 
      (async () => {
        await axios.get(api).then(res => {
          if (res.data) {
            if (isMounted) {setData(res.data);setMounted(false)}
          }
        })
      })();
    }
    else  {
      setTitle(value);
      (async () => {
        await axios.get(api).then(res => {
          if (res.data) {
            if (isMounted) {setData(res.data);setMounted(false)};
          }
        })
      })();
    }
    return () => {
      setMounted(false);
    };
  }, [])
  return (
    <View style={styles.container}>
      {isMounted && <ActivityIndicator color={"#fff"} />}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <SearchTextInfo data={data} path="/screens/ModalScreen.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
});
