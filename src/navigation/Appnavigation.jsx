import * as React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import SplashScreen from '../screens/Splash/SplashScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import CategoriesList from '../screens/Categories/CategoriesList';
import CategoriesListDetails from '../screens/Categories/CategoriesListDetails';
import SearchScreen from '../screens/Search/SearchScreen';
import SearchScreensDetails from '../screens/Search/SearchScreensDetails';
import FavouriteScreen from '../screens/Favourite/FavouriteScreen';
import DrawerNavigation from './DrawerNavigation';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const theme = useSelector(state => state.themeReducers); // Get the theme from Redux store

  const appTheme = theme ? DarkTheme : DefaultTheme; // Use DarkTheme when theme is true, otherwise use DefaultTheme

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
        <Stack.Screen name="CategoriesList" component={CategoriesList} />
        <Stack.Screen
          name="CategoriesListDetails"
          component={CategoriesListDetails}
        />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} />
        <Stack.Screen
          name="SearchScreensDetails"
          component={SearchScreensDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
