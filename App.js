import React, {
  useCallback, 
  useEffect, 
  useState,
} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthProvider from './src/contexts/auth';
import Routes from './src/routes';

import { Roboto_400Regular,Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() =>{
    async function prepare() {
      try{
        await Font.loadAsync({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch(e){
        console.warn(e);
      } finally{
        setAppIsReady(true);
      }
    }

    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
}


