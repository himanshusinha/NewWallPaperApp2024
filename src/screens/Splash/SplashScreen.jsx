import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import DrawerNavigation from '../../navigation/DrawerNavigation';
import {useSelector} from 'react-redux';

const SplashScreen = () => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.themeReducers);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate('DrawerNavigation', {screen: 'HomeScreen'});
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme ? 'black' : 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: theme ? 'white' : 'black',
          fontSize: 30,
          fontWeight: 'bold',
        }}>
        WallPaper
      </Text>
    </View>
  );
};

export default SplashScreen;
