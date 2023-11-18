import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.replace('HomeScreen');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'black', fontSize: 30, fontWeight: 'bold'}}>
        WallPaper App 2024
      </Text>
    </View>
  );
};

export default SplashScreen;
