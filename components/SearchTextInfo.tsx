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
    console.log('Loading Sound', url);
    const sound = new Audio.Sound();
    await sound.loadAsync({ uri: url })
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
  }
  const wordInfo = data && data[0] || {};
  const meanings = wordInfo.meanings;
  console.log('word info', wordInfo);
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          <b>Pronunciation</b> {wordInfo.phonetic}
        </Text>
        {wordInfo.phonetics && wordInfo.phonetics.map((value: any, key: any) => {
          console.log(value, key);
          return (
            <div style={{ display: "flex" }}>
              <Text
                style={styles.getStartedText}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)">
                <i>{key == 0 ? "(enUK)" : "(enUS)"}</i> : {value.text}
              </Text>
              {value.audio && 
              <Pressable
                onPress={async () => await playSound(value.audio)}
              >

                <FontAwesome
                  name="file-audio-o"
                  size={18}
                  style={{ marginLeft: 15 }}
                  color="#FFFFFF"
                />
              </Pressable>
        }
            </div>
          )
        })}
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        {meanings && meanings.map((value: any, key: any) => {
          const definitions = value.definitions || [];
          return (
            <div>
              <Text
                style={styles.infoText}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)">
                {value.partOfSpeech}
              </Text>
              {definitions && definitions.map((def: any, num: any) => {
                console.log('definition',def);
                return (
                  <div style={{display: 'grid'}}>
                    <Text
                      style={styles.getStartedText}
                      lightColor="rgba(0,0,0,0.8)"
                      darkColor="rgba(255,255,255,0.8)">
                      {num+1}. {def.definition}
                    </Text>
                    { def.synonyms.length != 0 &&
                      <Text
                        style={styles.getStartedText}
                        lightColor="rgba(0,0,0,0.8)"
                        darkColor="rgba(255,255,255,0.8)">
                        Synonyms: {def.synonyms.join(", ").toString()}
                      </Text>
                    }
                    {def.antonyms.length != 0 &&
                      <Text
                        style={styles.getStartedText}
                        lightColor="rgba(0,0,0,0.8)"
                        darkColor="rgba(255,255,255,0.8)">
                        Antonyms: {def.antonyms.join(", ").toString()}
                      </Text>
                    }
                    {def.example &&
                      <Text
                        style={styles.exampleText}
                        lightColor="rgba(0,0,0,0.8)"
                        darkColor="rgba(255,255,255,0.8)">
                        Example: {def.example}
                      </Text>
                    }
                  </div>
                )
              })}
               { value.synonyms.length != 0 &&
                      <Text
                        style={styles.infoDetail}
                        lightColor="rgba(0,0,0,0.8)"
                        darkColor="rgba(255,255,255,0.8)">
                        Synonyms: {value.synonyms.join(", ").toString()}
                      </Text>
                    }
                    {value.antonyms.length != 0 &&
                      <Text
                        style={styles.infoDetail}
                        lightColor="rgba(0,0,0,0.8)"
                        darkColor="rgba(255,255,255,0.8)">
                        Antonyms: {value.antonyms.join(", ").toString()}
                      </Text>
                    }
              
              ;
            </div>
          )

        })}

      </View>
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
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80vw',
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
  infoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFF00'
  },
  infoDetail: {
    fontSize: 16,
    color: '#00FFDC'
  },
  exampleText:{
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
