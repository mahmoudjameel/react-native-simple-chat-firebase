import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import FirstView from './Views/FirstView'
import SignupView from './Views/SignupView'
import LoginView from './Views/LoginView'
import HomeView from './Views/HomeView'
import ProfileView from './Views/ProfileView'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './Config/firebase'
const Stack = createStackNavigator();
export default function App() {

  // Set an initializing state while Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    console.log(`useeffect == ${user}`)
    auth.onAuthStateChanged(onAuthStateChanged);

  });

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;


  return (
  <NavigationContainer>
      <Stack.Navigator>
        {!user ? 
        <>
        <Stack.Screen name="firstview" component={FirstView} options={{ title: '' }} />
        <Stack.Screen name="signupview" component={SignupView} options={{ title: 'Sign up' }} />
        <Stack.Screen name="loginview" component={LoginView} options={{ title: 'Log in' }} />
        </>: 
        <>
          <Stack.Screen name="homeview" component={HomeView}
          options={{ title: ' ', headerStyle: { backgroundColor: '#35354c' } }} />
        <Stack.Screen name="profileview" component={ProfileView} options={{ title: 'Profile' }} />
        </>}
        
       

      </Stack.Navigator>
    </NavigationContainer>
  );
}


