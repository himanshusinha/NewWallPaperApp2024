import React from 'react';
import {StatusBar, View} from 'react-native';
import {useSelector} from 'react-redux';
import AppNavigation from './Appnavigation';

const Routes = () => {
  const theme = useSelector(state => state.themeReducers);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={theme ? 'light-content' : 'dark-content'}
        backgroundColor={theme ? 'black' : 'white'}
      />
      <AppNavigation />
    </View>
  );
};

export default Routes;
