import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Cricket from './Cricket';
import CricketMatch from './CricketMatch';
import Tennis from './Tennis';
import TennisTournament from './TennisTournaments';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen name="SAKSports" component={Home} />
        <Stack.Screen name="Cricket" component={Cricket} />
        <Stack.Screen name="DisplayCricketMatch" component={CricketMatch} />
        <Stack.Screen name="Tennis" component={Tennis} />
        <Stack.Screen name="DisplayTennisTournaments" component={TennisTournament} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
