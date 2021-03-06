import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {createTable,openDatabase,getWordHistory, addHistory} from './db';
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [data,setData] = useState([]);
  const loadDataCallback = useCallback(async () => {
    try {
      const db = await openDatabase();
      await createTable(db); 
      // await addHistory(db,'side');
      // await addHistory(db,'in');
      // await addHistory(db,'alien');

      // let storedWord = await getWordHistory(db) || []; 
    
      // if (storedWord.length) {
      //   setData(storedWord);
      // }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
