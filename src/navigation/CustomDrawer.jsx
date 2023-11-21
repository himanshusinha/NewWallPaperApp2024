import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useState} from 'react';
import {Image, View, Text, Switch} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'; // Import useDispatch and useSelector
import {changeTheme} from '../redux/actions';

const CustomDrawerContent = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch(); // Get the dispatch function
  const theme = useSelector(state => state.themeReducers); // Get the theme from Redux store

  const {navigation} = props;

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    dispatch(changeTheme(!theme)); // Dispatch the changeTheme action
  };
  const heartImageSource = theme
    ? require('../assets/images/search_white.png')
    : require('../assets/images/search.png');

  return (
    <DrawerContentScrollView
      style={{flex: 1, backgroundColor: theme ? 'black' : 'white'}}
      {...props}>
      <View
        style={{
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
          }}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeY47myOX3RXZHolZI6Z4sxGO0dwPQrCyJbw&usqp=CAU',
          }}
        />
        <Text
          style={{
            marginTop: 20,
            color: theme ? 'white' : 'black',
            fontWeight: 'bold',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          WallPaper App 2024
        </Text>
      </View>

      <DrawerItem
        label="Change Theme"
        labelStyle={{color: theme ? 'white' : 'black'}}
        icon={() => (
          <Switch
            trackColor={{false: 'lightgrey', true: 'lightgrey'}}
            thumbColor={theme ? 'black' : 'lightgrey'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={theme}
          />
        )}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
