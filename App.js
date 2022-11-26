import News from "./News";
import Details from "./Details";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack =createNativeStackNavigator();
  return (
    <NavigationContainer intialRouterName='News'>
      <Stack.Navigator>
        <Stack.Screen
          name='News'
          component={News}
          options={{
            title:'News',
            headerTitle: 'News',
          }}
        />
         <Stack.Screen
          name='Details'
          component={Details}
          options={{
            title:'Details',
            headerTitle: 'Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}

