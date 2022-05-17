/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, TextInput, View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}


/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();


function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [isSearch, setSearching] = useState(false);
  const [value, setValue] = useState('');
  // const styles = StyleSheet.create({
  //   search: {}
  // })
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title:'Từ điển Anh - Anh',
          headerTitle: !isSearch ? 'Từ điển Anh - Anh' : '',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          headerLeft: () => (
            isSearch ?
              (
                <div style={{
                  "height": "50%",
                  "width": "100vw",
                  "display": 'flex'
                }}
                >
                <Pressable
                // onPress={() => navigation.navigate('Modal')}
                onPress={() => {
                  setSearching(false);
                }}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome
                  name="arrow-left"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15, marginLeft: 10 }}
                />
              </Pressable> : ''
                  <TextInput
                    editable
                    placeholder='Type in the word'
                    style={{
                      "borderColor": '#FFFFFF',
                      "borderWidth": 1,
                      'color': "#FFFFFF",
                      "height": "100%",
                      "width": "90%"
                    }}

                    onChangeText={(text: any) => setValue(text)}
                    value={value}
                  />
                  <Pressable
                    onPress={() => navigation.navigate('Modal', {value: value})}
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.5 : 1,
                    })}>
                    <FontAwesome
                      name="search"
                      size={25}
                      color={Colors[colorScheme].text}
                      style={{ marginRight: 10,marginLeft: 10, display: 'flex', justifyContent: 'flex-end', flex: 1, alignItems: "center" }}
                    />
                  </Pressable>
                </div>
              ) : ''
          ),
          headerRight: () => (
            !isSearch ?
              <Pressable
                // onPress={() => navigation.navigate('Modal')}
                onPress={() => {
                  setSearching(true);
                }}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome
                  name="search"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable> : ''
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Từ điển Việt - Anh',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          headerRight: () => (
            <Pressable
              // onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              
              <FontAwesome
                name="search"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
