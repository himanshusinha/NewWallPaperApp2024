import React from 'react';
import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeFromFavourite} from '../redux/actions';
import FastImage from 'react-native-fast-image';
import ItemFavouritesStyles from '../styles.jsx/ItemFavouritesStyles';

const ItemFavourites = ({item, index}) => {
  const dispatch = useDispatch();

  const removeItem = () => {
    dispatch(removeFromFavourite(index));
    ToastAndroid.showWithGravity(
      'Wallpaper removed from favourites',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  return (
    <View style={ItemFavouritesStyles.container}>
      <TouchableOpacity
        onPress={removeItem}
        style={ItemFavouritesStyles.removeButtonContainer}>
        <FastImage
          style={ItemFavouritesStyles.removeButtonIcon}
          source={require('../assets/images/heart.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
      <FastImage
        style={ItemFavouritesStyles.image}
        source={{uri: item.src.original}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={ItemFavouritesStyles.photographerContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={ItemFavouritesStyles.photographerText}>
            {item.photographer}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ItemFavourites;
