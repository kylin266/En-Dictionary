import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
export default function SearchTextInfo({ data, path }: { data: any, path: string }) {

  const [sound, setSound] = useState({} as any);
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
            <View key={key} style={{ display: "flex" ,flexDirection: 'row', backgroundColor: '#0EC0A7'}}>
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
            <View style={{backgroundColor: '#0EC0A7'}} key={key}>
              <Text
                style={styles.infoText}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)">
                {value.partOfSpeech || ''}
              </Text>
              {!!definitions && definitions.map((def: any, num: any) => {
                return (
                  <View key={num} style={{ display: 'flex' ,backgroundColor: '#0EC0A7'}}>
                    <Text
                      style={styles.getStartedText}
                      lightColor="rgba(0,0,0,0.8)"
                      darkColor="rgba(255,255,255,0.8)">
                      {num + 1}. {def.definition || ''}
                    </Text>
                    {!!def.synonyms && def.synonyms.length != 0 &&
                      <Text
                        style={styles.getStartedText}
                        lightColor="rgba(0,0,0,0.8)"
                        darkColor="rgba(255,255,255,0.8)">
                        Synonyms: {!!def.synonyms && def.synonyms.join(", ").toString() || ''}
                      </Text>
                    }
                    {!!def.antonyms && def.antonyms.length != 0 &&
                      <Text
                        style={styles.getStartedText}
                        lightColor="rgba(0,0,0,0.8)"
                        darkColor="rgba(255,255,255,0.8)">
                        Antonyms: {!!def.antonyms && def.antonyms.join(", ").toString() || ''}
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
                  Synonyms: {!!value.synonyms && value.synonyms.join(", ").toString() || ''}
                </Text>
              }
              {!!value.antonyms && value.antonyms.length != 0 &&
                <Text
                  style={styles.infoDetail}
                  lightColor="rgba(0,0,0,0.8)"
                  darkColor="rgba(255,255,255,0.8)">
                  Antonyms: {!!value.synonyms && value.antonyms.join(", ").toString() || ''}
                </Text>
              }
            </View>
          )

        })}

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
    color: '#00FFDC'
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
