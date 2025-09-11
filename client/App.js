import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './screens/ListScreen';
import PlayerScreen from './screens/PlayerScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={ListScreen} options={{ title: 'Videos' }} />
        <Stack.Screen name="Player" component={PlayerScreen} options={{ title: 'Player' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
