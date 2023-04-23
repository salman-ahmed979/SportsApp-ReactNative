import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Cricket from './Cricket';
import Tennis from './Tennis';

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Cricket" component={Cricket} />
      <Tab.Screen name="Tennis" component={Tennis} />
    </Tab.Navigator>
  );
};

export default Home;
