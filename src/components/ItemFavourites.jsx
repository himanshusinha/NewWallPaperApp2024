import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {removeFromFavourite} from '../redux/actions';
import FastImage from 'react-native-fast-image';

const ItemFavourites = ({item, index}) => {
  const dispatch = useDispatch();
  const removeItem = () => {
    dispatch(removeFromFavourite(index));
  };

  return (
    <View
      style={{
        borderColor: 'grey',
        borderWidth: 0.3,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,
      }}>
      <TouchableOpacity
        onPress={removeItem}
        style={{padding: 10, alignItems: 'flex-end'}}>
        <FastImage
          style={{width: 20, height: 20}}
          source={require('../assets/images/heart.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
      <FastImage
        style={{width: '100%', height: 220}}
        source={{uri: item.src.original}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={{color: 'black', fontWeight: '500'}}>
            {item.photographer}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ItemFavourites;
