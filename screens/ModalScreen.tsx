import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import SearchTextInfo from '../components/SearchTextInfo';
import wordData from '../words.json';
import { addHistory, deleteBookmark, getWordBookmarkByWord, getWordHistoryByWord, insertBookmark, openDatabase } from '../db';
export default function ModalScreen(props: any) {
  const { value } = props.route.params;
  const {navigation} = props;
  const [data, setData] = useState([] as any);
  const [title, setTitle] = useState(value);
  const [err, setErr] = useState('');
  const [isMounted, setMounted] = useState(true);
  const [favorite, setFavorite] = useState(false);
  let api = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`
  useEffect(() => {
    if (value == 'randomWord') {
      var item = wordData[Math.floor(Math.random() * wordData.length)];
      setTitle(item);

      let api = `https://api.dictionaryapi.dev/api/v2/entries/en/${item}`;
      (async () => {
        await axios.get(api).then(async res => {
          if (res.data) {
            if (isMounted) {
              setData(res.data); setMounted(false); const db = await openDatabase();
              const word = await getWordBookmarkByWord(db, item);
              if (word) {
                setFavorite(true);
              }
              await addHistory(db, item);
            
            }
          }
        }).catch(err => {
          setMounted(false)
          setErr(err.response.data.message);
        })
      })();
    }
    else if (value == 'wordOfTheDay') {
      let num = 3333;
      var item = wordData[num];
      setTitle(item);

      let api = `https://api.dictionaryapi.dev/api/v2/entries/en/${item}`;
      (async () => {
        await axios.get(api).then(async res => {
          if (res.data) {
            if (isMounted) {
              setData(res.data); setMounted(false);
              const db = await openDatabase();

              
              const word = await getWordBookmarkByWord(db, item);
              console.log('tim dc', item,word)
              if (word) {
                setFavorite(true);
              }
            }
          }
        }).catch(err => {
          setMounted(false)
          setErr(err.response.data.message);
        })
      })();
    }
    else {
      setTitle(value);

      (async () => {
        await axios.get(api).then(async res => {
          if (res.data) {
              setData(res.data); 
              setMounted(false);
              const db = await openDatabase();

              const word = await getWordBookmarkByWord(db, value);
              if (word) {
                setFavorite(true);
              }
              await addHistory(db, value);
          }
        }).catch(err => {
          setMounted(false)
          if (err.response)
          setErr(err.response.data.message);
        })
      })();
    }
    return () => {
      setMounted(false);
    };
  }, [value])
  return (

    <ScrollView style={styles.container}>
      {!!isMounted && <ActivityIndicator color={"#fff"} />}
      <Text style={styles.title}>{title}
        {!!data && <Pressable
          onPress={async () => {
            setFavorite(!favorite);
            if (favorite) {
              const db = await openDatabase();
              await deleteBookmark(db,title);

            }
            else {
              const db = await openDatabase();
              await insertBookmark(db,title);

            }
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}>
          {!favorite ?
            <FontAwesome
              name="star-o"
              size={25}
              color='#FFFFFF'
              style={{ marginRight: 15, marginLeft: 10, marginBottom: -5,marginTop: 10 }}
            /> : <FontAwesome
              name="star"
              size={25}
              color='#FFFFFF'
              style={{ marginRight: 15, marginLeft: 10, marginBottom: -5 ,marginTop: 10 }}
            />
          }
        </Pressable>
        }
      </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {!!data && <SearchTextInfo navigation={navigation} data={data} path="/screens/ModalScreen.tsx" />}
      {data.length == 0 && <Text style={styles.title}>{err}</Text>}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#0EC0A7'
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
