import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { FontAwesome } from '@expo/vector-icons';
import useColorScheme from '../hooks/useColorScheme';
export default function EditScreenInfo({ navigation, path }: { navigation: any, path: string }) {
  return (
      <View style={styles.getStartedContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate('Modal', { value: 'wordOfTheDay' });
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}>
          <Text
            style={styles.getStartedText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)">
            <FontAwesome
              name="file"
              size={25}
              style={{ marginRight: 10 }}
            />
            Word of the day!

          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('History');
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}>

          <Text
            style={styles.getStartedText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)">
            <FontAwesome
              name="file-text"
              size={25}
              style={{ marginRight: 10 }}
            />
            History
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Bookmark');
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}>

        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          <FontAwesome
            name="bookmark"
            size={25}
            style={{ marginRight: 10 }}
          />
          Bookmark
        </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Help');
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          <FontAwesome
            name="question-circle"
            size={25}
            style={{ marginRight: 10 }}
          />
          Help
        </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Modal', { value: 'randomWord' });
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}>
          <Text
            style={styles.getStartedText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)">
            <FontAwesome
              name="compass"
              size={25}
              style={{ marginRight: 10 }}
            />
            Random word

          </Text>
        </Pressable>

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
    alignItems: 'center',
    marginHorizontal: 50,
    backgroundColor: '#0EC0A7' 
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    marginBottom: 20

  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
