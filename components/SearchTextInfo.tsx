import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function SearchTextInfo({ path }: { path: string }) {


  const data = [
    {
        "word": "amazing",
        "phonetic": "/əˈmeɪzɪŋ/",
        "phonetics": [
            {
                "text": "/əˈmeɪzɪŋ/",
                "audio": ""
            },
            {
                "text": "/əˈmeɪzɪŋ/",
                "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/amazing-us.mp3",
                "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=1230794",
                "license": {
                    "name": "BY-SA 3.0",
                    "url": "https://creativecommons.org/licenses/by-sa/3.0"
                }
            }
        ],
        "meanings": [
            {
                "partOfSpeech": "verb",
                "definitions": [
                    {
                        "definition": "To fill with wonder and surprise; to astonish, astound, surprise or perplex.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "He was amazed when he found that the girl was a robot."
                    },
                    {
                        "definition": "To undergo amazement; to be astounded.",
                        "synonyms": [],
                        "antonyms": []
                    },
                    {
                        "definition": "To stupefy; to knock unconscious.",
                        "synonyms": [],
                        "antonyms": []
                    },
                    {
                        "definition": "To bewilder; to stupefy; to bring into a maze.",
                        "synonyms": [],
                        "antonyms": []
                    },
                    {
                        "definition": "To terrify, to fill with panic.",
                        "synonyms": [],
                        "antonyms": []
                    }
                ],
                "synonyms": [],
                "antonyms": []
            },
            {
                "partOfSpeech": "adjective",
                "definitions": [
                    {
                        "definition": "Causing wonder and amazement; very surprising.",
                        "synonyms": [],
                        "antonyms": []
                    },
                    {
                        "definition": "Possessing uniquely wonderful qualities.",
                        "synonyms": [],
                        "antonyms": []
                    },
                    {
                        "definition": "Very good.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "2015, June 10, Lindsey Bever, \"Morning Mix: Another reason seeing-eye dogs are amazing\"http//www.washingtonpost.com/news/morning-mix/wp/2015/06/10/another-heroic-story-showing-why-seeing-eye-dogs-are-amazing/"
                    }
                ],
                "synonyms": [],
                "antonyms": []
            }
        ],
        "license": {
            "name": "CC BY-SA 3.0",
            "url": "https://creativecommons.org/licenses/by-sa/3.0"
        },
        "sourceUrls": [
            "https://en.wiktionary.org/wiki/amaze",
            "https://en.wiktionary.org/wiki/amazing"
        ]
    }
]
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Open up the code for this screen:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
          <MonoText>{path}</MonoText>
        </View>

        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Change any of the text, save the file, and your app will automatically update.
        </Text>
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
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
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
