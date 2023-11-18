import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToFavourite} from '../redux/actions';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import ItemCategoriesListStyles from '../styles.jsx/ItemCategoriesListStyles';

const ItemCategoriesList = ({item, data}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.reducers);

  const isFavorite = favorites.some(
    favoriteItem => favoriteItem.id === item.id,
  );

  const {width} = Dimensions.get('window');
  const numColumns = width >= 400 ? 2 : 2;
  const itemWidth = width / numColumns;

  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const addItem = item => {
    dispatch(addToFavourite(item));
  };

  const navigateToDetails = () => {
    navigation.navigate('CategoriesListDetails', {
      selectedImage: item.src.original,
      selectedImages: data.map(dataItem => dataItem.src.original),
      selectedTexts: data.map(dataItem => dataItem.photographer),
    });
  };

  return (
    <TouchableOpacity
      onPress={navigateToDetails}
      activeOpacity={0.3}
      style={[ItemCategoriesListStyles.container, {width: itemWidth - 10}]}>
      <TouchableOpacity
        onPress={() => {
          addItem(item);
        }}
        style={ItemCategoriesListStyles.favoriteButtonContainer}>
        <FastImage
          style={ItemCategoriesListStyles.favoriteIcon}
          source={
            isFavorite
              ? require('../assets/images/heart_fill.png')
              : require('../assets/images/heart.png')
          }
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
      <FastImage
        style={ItemCategoriesListStyles.image}
        source={{uri: item.src.original}}
        resizeMode={FastImage.resizeMode.cover}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <View style={ItemCategoriesListStyles.loadingOverlay}>
          <ActivityIndicator size="small" color="black" />
        </View>
      )}
      <View style={ItemCategoriesListStyles.photographerContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={ItemCategoriesListStyles.photographerText}>
            {item.photographer} {''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCategoriesList;
