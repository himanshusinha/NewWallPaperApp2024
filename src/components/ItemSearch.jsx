import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToFavourite} from '../redux/actions';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import ItemSearchStyles from '../styles.jsx/ItemSearchStyles';

const ItemSearch = ({item, data}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.reducers);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const isFavorite = favorites.some(
    favoriteItem => favoriteItem.id === item.id,
  );

  const {width} = Dimensions.get('window');
  const numColumns = width >= 400 ? 2 : 2;
  const itemWidth = width / numColumns;

  const addItem = item => {
    dispatch(addToFavourite(item));
  };

  const navigateToDetails = () => {
    navigation.navigate('SearchScreensDetails', {
      selectedImage: item.src.original,
      selectedImages: data.map(dataItem => dataItem.src.original),
      selectedTexts: data.map(dataItem => dataItem.photographer),
    });
  };

  return (
    <TouchableOpacity
      onPress={navigateToDetails}
      style={[
        ItemSearchStyles.container,
        {width: itemWidth - 12, marginHorizontal: 5},
      ]}>
      <TouchableOpacity
        onPress={() => addItem(item)}
        style={ItemSearchStyles.favoriteButtonContainer}>
        <FastImage
          style={ItemSearchStyles.favoriteButtonIcon}
          source={
            isFavorite
              ? require('../assets/images/heart_fill.png')
              : require('../assets/images/heart.png')
          }
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
      <FastImage
        style={ItemSearchStyles.image}
        source={{uri: item.src.original}}
        resizeMode={FastImage.resizeMode.cover}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <View style={ItemSearchStyles.loadingOverlay}>
          <ActivityIndicator size="small" color="black" />
        </View>
      )}
      <View style={ItemSearchStyles.photographerContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={ItemSearchStyles.photographerText}>
            {item.photographer}{' '}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemSearch;
