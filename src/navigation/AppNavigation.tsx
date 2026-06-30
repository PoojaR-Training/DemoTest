import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onBoard } from '../screens/onBoarding';
import { Login } from '../screens/Login';
import { TabNavigation } from './TabNavigation';
import { Storage } from '../utils/storage';
import { Colors } from '../theme/colors';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigation = () => {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const [loggedIn, onboarded] = await Promise.all([
        Storage.isLoggedIn(),
      ]);

      if (loggedIn) {
        setInitialRoute('MainTabs');
      }  else {
        setInitialRoute('Onboarding');
      }
    };
    checkAuth();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.white }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <>
    <StatusBar barStyle={'dark-content'} />
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Onboarding" component={onBoard} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainTabs" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};
