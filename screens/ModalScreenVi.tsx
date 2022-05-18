import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, ActivityIndicator, ScrollView, Pressable,useWindowDimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import SearchTextInfo from '../components/SearchTextInfo';
import { WebView } from 'react-native-webview';
import wordData from '../words.json';
import RenderHtml from 'react-native-render-html';
import { addHistory, deleteBookmark, getWordBookmarkByWord, getWordHistoryByWord, insertBookmark, openDatabase } from '../db';
export default function ModalScreenVi(props: any) {
  const {width} = useWindowDimensions();
  const { value } = props.route.params;
  const [data, setData] = useState({} as any);
  const [title, setTitle] = useState(value);
  const [err, setErr] = useState('');
  const [isMounted, setMounted] = useState(true);
  const [favorite, setFavorite] = useState(false);
  let api = `http://m.dict.laban.vn/en_vn/find?keyword=${value}`
  useEffect(() => {
    setTitle(value);
    console.log(api);
    (async () => {
      await axios.get(api).then(async res => {
        if (res.data) {
          if (isMounted) {
            console.log(res.data);
            setData(res.data); setMounted(false);
            const db = await openDatabase();

            const word = await getWordBookmarkByWord(db, value);
            if (word) {
              setFavorite(true);
            }
            await addHistory(db, value);
          };
        }
      }).catch(err => {
        setMounted(false)
        if (err.response)
          setErr(err.response.data.message);
      })
    })();

    return () => {
      setMounted(false);
    };
  }, [])
  return (

    <ScrollView style={styles.container}>
      {!!isMounted && <ActivityIndicator color={"#fff"} />}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <RenderHtml
      contentWidth={width}
      source={{html: data}}
    />
      {data && <Text style={styles.title}>{err}</Text>}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
});
