import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToFavourite} from '../redux/actions';
import FastImage from 'react-native-fast-image';
import ItemHomeStyles from '../styles.jsx/ItemHomeStyles';

const ItemHome = ({item}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.reducers);

  const isFavorite = favorites.some(
    favoriteItem => favoriteItem.id === item.id,
  );

  const [loading, setLoading] = useState(true);

  const addItem = item => {
    dispatch(addToFavourite(item));
    ToastAndroid.showWithGravity(
      'Wallpaper added to favourites',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  return (
    <View style={ItemHomeStyles.container}>
      <TouchableOpacity
        onPress={() => addItem(item)}
        style={ItemHomeStyles.favoriteButtonContainer}>
        <FastImage
          style={ItemHomeStyles.favoriteButtonIcon}
          source={
            isFavorite
              ? require('../assets/images/heart_fill.png')
              : require('../assets/images/heart.png')
          }
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
      <FastImage
        style={ItemHomeStyles.image}
        source={{uri: item.src.original}}
        resizeMode={FastImage.resizeMode.cover}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <View style={ItemHomeStyles.loadingOverlay}>
          <ActivityIndicator size="small" color="black" />
        </View>
      )}
      <View style={ItemHomeStyles.photographerContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={ItemHomeStyles.photographerText}>
            {item.photographer}{' '}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ItemHome;
