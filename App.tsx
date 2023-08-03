import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import List from './app/screens/List';
import Details from './app/screens/Details';
import { useEffect } from 'react';
import analytics from '@react-native-firebase/analytics';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="My Todos" component={List}/>
        <Stack.Screen name="Details" component={Details}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export function useTrackScreenView(screenName) {
//   useEffect(() => {
//       analytics().logScreenView({
//           screen_name: screenName,
//           screen_class: screenName,
//       });
//   }, [screenName]);
// }

// import * as React from 'react';
// import { View, Button } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/native';

// function Home({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         title="Go to Settings"
//         onPress={() => navigation.navigate('Settings')}
//       />
//     </View>
//   );
// }

// function Settings({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// export default function App() {
//   const routeNameRef = React.useRef();
//   const navigationRef = React.useRef();

//   return (
//     <NavigationContainer
//       ref={navigationRef}
//       onReady={() =>
//         (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
//       }
//       onStateChange={() => {
//         const previousRouteName = routeNameRef.current;
//         const currentRouteName = navigationRef.current.getCurrentRoute().name;

//         if (previousRouteName !== currentRouteName) {
//           // Replace the line below to add the tracker from a mobile analytics SDK
//           alert(`The route changed to ${currentRouteName}`);
//         }

//         // Save the current route name for later comparison
//         routeNameRef.current = currentRouteName;
//       }}
//     >
//       <Stack.Navigator>
//       <Stack.Screen name="My Todos" component={List}/>
//         <Stack.Screen name="Details" component={Details}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }