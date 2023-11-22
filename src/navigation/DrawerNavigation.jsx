// DrawerNavigation.jsx
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import HomeScreen from '../screens/Home/HomeScreen';
import CustomDrawerContent from './CustomDrawer';
import {Image, TouchableOpacity, Text, View} from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const theme = useSelector(state => state.themeReducers);

  // Define the image path based on the theme
  const menuImage = theme
    ? require('../assets/images/menu_light.png')
    : require('../assets/images/menu.png');

  const CustomHeaderLeft = ({navigation}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
      }}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image
          style={{width: 20, height: 20, marginHorizontal: 30}}
          source={menuImage}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: theme ? 'white' : 'black',
          fontSize: 18,
          alignSelf: 'center',
          justifyContent: 'center',
          width: '90%',
          fontWeight: 'bold',
        }}>
        WallPaper
      </Text>
    </View>
  );

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={' '}
        component={HomeScreen}
        options={({navigation}) => ({
          headerLeft: props => (
            <CustomHeaderLeft {...props} navigation={navigation} />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
