import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, Pressable, TextInput, Button, Alert } from 'react-native';
import { Audio } from 'expo-av';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {deleteNote, getWordNoteByWord, insertNote, openDatabase, UpdateWordNote } from '../db';
export default function SearchTextInfo({ navigation, data, path }: { navigation: any, data: any, path: string }) {
  const [sound, setSound] = useState({} as any);
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  async function playSound(url: any) {
    const sound = new Audio.Sound();
    await sound.loadAsync({ uri: url })
    setSound(sound);
    await sound.playAsync();
  }
  const wordInfo = !!data && data[0] || {};
  const meanings = wordInfo.meanings || [];
  return (
    <View style={styles.getStartedContainer}>
      <Text
        style={styles.pronunciation}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        Pronunciation: {wordInfo.phonetic}
      </Text>
      {!!wordInfo.phonetics && wordInfo.phonetics.map((value: any, key: any) => {
        return (
          <View key={key} style={{ display: "flex", flexDirection: 'row', backgroundColor: '#0EC0A7' }}>
            <Text
              style={styles.getStartedTextItalic}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)">
              {key == 0 ? "(enUK)" : "(enUS)"} : {value.text || ""}
            </Text>
            {!!value.audio ?
              <Pressable
                onPress={async () => await playSound(value.audio)}
              >

                <FontAwesome
                  name="file-audio-o"
                  size={18}
                  style={{ marginLeft: 15 }}
                  color="#FFFFFF"
                />
              </Pressable> : null
            }
          </View>
        )
      })}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {!!meanings && meanings.map((value: any, key: any) => {
        const definitions = value.definitions || [];
        return (
          <View style={{ backgroundColor: '#0EC0A7' }} key={key}>
            <Text
              style={styles.infoText}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)">
              {value.partOfSpeech || ''}
            </Text>
            {!!definitions && definitions.map((def: any, num: any) => {
              return (
                <View key={num} style={{ display: 'flex', backgroundColor: '#0EC0A7' }}>
                  <Text
                    style={styles.getStartedText}
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)">
                    {num + 1}. {def.definition || ''}
                  </Text>
                  {!def.synonyms && def.synonyms.length != 0 &&
                    <Text
                      style={styles.getStartedText}
                      lightColor="rgba(0,0,0,0.8)"
                      darkColor="rgba(255,255,255,0.8)">
                      {/* Synonyms: {!!def.synonyms && def.synonyms.join(", ").toString() || ''} */}
                      synonyms:
                      {!def.synonyms.map((sys: any, num2: any) => {
                        return (
                          <Pressable
                            key={num2}
                            onPress={async () => navigation.navigate('Modal', { value: sys, navigation: navigation })}
                          >

                            <Text
                              style={styles.infoDetailSmallBold}
                              lightColor="rgba(0,0,0,0.8)"
                              darkColor="rgba(255,255,255,0.8)"> {sys} </Text>
                          </Pressable>
                        )
                      })}
                    </Text>
                  }
                  {!!def.antonyms && def.antonyms.length != 0 &&
                    <Text
                      style={styles.infoDetailSmall}
                      lightColor="rgba(0,0,0,0.8)"
                      darkColor="rgba(255,255,255,0.8)">
                      {/* Antonyms: {!!def.antonyms && def.antonyms.join(", ").toString() || ''} */}
                      antonyms:
                      {def.antonyms.map((anym: any, num2: any) => {
                        return (
                          <Pressable
                            key={num2}
                            onPress={async () => navigation.navigate('Modal', { value: anym, navigation: navigation })}
                          >

                            <Text
                              style={styles.infoDetailSmallBold}
                              lightColor="rgba(0,0,0,0.8)"
                              darkColor="rgba(255,255,255,0.8)"> {anym} </Text>
                          </Pressable>)
                      })}
                    </Text>
                  }
                  {!!def.example &&
                    <Text
                      style={styles.exampleText}
                      lightColor="rgba(0,0,0,0.8)"
                      darkColor="rgba(255,255,255,0.8)">
                      Example: {def.example || ''}
                    </Text>
                  }
                </View>
              )
            })}
            {!!value.synonyms && value.synonyms.length != 0 &&
              <Text
                style={styles.infoDetail}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)">
                {/* Synonyms: {!!value.synonyms && value.synonyms.join(", ").toString() || ''} */}
                Synonyms:
                {value.synonyms.map((sys: any, num2: any) => {
                  return (
                    <Pressable
                      key={num2}
                      onPress={async () => navigation.navigate('Modal', { value: sys, navigation: navigation })}
                    >

                      <Text
                        style={styles.infoDetailSmallBold}
                        lightColor="rgba(0,0,0,0.8)"
                        darkColor="rgba(255,255,255,0.8)"> {sys} </Text>
                    </Pressable>
                  )
                })}
              </Text>
            }
            {!!value.antonyms && value.antonyms.length != 0 &&
              <Text
                style={styles.infoDetail}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)">
                {/* Synonyms: {!!value.synonyms && value.synonyms.join(", ").toString() || ''} */}
                Antonyms:
                {value.antonyms.map((anym: any, num2: any) => {
                  return (
                    <Pressable
                      key={num2}
                      onPress={async () => navigation.navigate('Modal', { value: anym, navigation: navigation })}
                    >

                      <Text
                        style={styles.infoDetailSmallBold}
                        lightColor="rgba(0,0,0,0.8)"
                        darkColor="rgba(255,255,255,0.8)"> {anym} </Text>
                    </Pressable>
                  )
                })}
              </Text>
            } 
           
          </View>
        )

      })}
   <Button title='Note' onPress={async () => {
              setShow(!show);
              const db = await openDatabase();
              const note = await getWordNoteByWord(db, wordInfo.word);
              if (note){
                setText(note.note);
              }
            }}>
              <FontAwesome
                name="edit"
                size={25}
                color='#FFFFFF'
                style={{ marginRight: 15, marginBottom: -5, marginTop: 10 }}
              />
            </Button>
            {show &&
              <View style={{ display: "flex", flexDirection: 'column', backgroundColor: 'rgb(14, 192, 167)' }}>
                <TextInput
                  multiline={true}
                  numberOfLines={8}
                  onChangeText={(val) => setText(val)}
                  value={text}
                  style={{
                    backgroundColor: "aquamarine",
                    marginTop: 10,
                    color: "red",
                    paddingLeft: 5,
                  }}
                />
                <View style={{display: 'flex',backgroundColor: 'rgb(14, 192, 167)', flexDirection: 'row' }}>
                  <Pressable
                    onPress={async () => {
                      const db = await openDatabase();
                      const note = await getWordNoteByWord(db, wordInfo.word); 
                      if (!note && text!=''){
                        await insertNote(db,wordInfo.word,text);
                        Alert.alert('Create Note Success')
                      }
                      else if (note && text!=''){
                        await UpdateWordNote(db,wordInfo.word,text)
                        let data = await getWordNoteByWord(db, wordInfo.word); 
                        console.log(data);
                        Alert.alert('Edit Note Success')
                      } 
                      
                    }}

                    style={{
                      width: '20%'
                    }}>

                    <FontAwesome
                      name="save"
                      size={25}
                      color='#FFFFFF'
                    />
                  </Pressable>
                  <Pressable
                    onPress={async () => {
                      setShow(false);
                      const db = await openDatabase();
                      await deleteNote(db,wordInfo.word);
                      setText("");
                    }}

                    style={{
                      width: '20%'
                    }}>

                    <FontAwesome
                      name="trash"
                      size={25}
                      color='#FFFFFF'
                    />
                  </Pressable>
                </View>
              </View>
            }
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    marginHorizontal: 50,
    backgroundColor: '#0EC0A7'
  },
  separator: {
    marginVertical: 10,
    height: 1,
    // width: '80vw',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 13,
    marginBottom: 10,
    lineHeight: 15,
  },
  getStartedTextItalic: {
    fontSize: 13,
    marginBottom: 10,
    lineHeight: 15,
    fontStyle: 'italic'
  },
  pronunciation: {
    fontSize: 13,
    marginBottom: 10,
    lineHeight: 15,
    fontWeight: 'bold'
  },
  infoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFF00'
  },
  infoDetail: {
    fontSize: 16,
    color: '#E42185'
  },
  infoDetailSmall: {
    fontSize: 14,
    color: '#E56B29'
  },
  infoDetailSmallBold: {
    fontSize: 16,
    color: '#E56B29',
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  exampleText: {
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '300'
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
  },
});
