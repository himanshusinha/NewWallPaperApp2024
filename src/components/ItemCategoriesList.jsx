import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addToFavourite} from '../redux/actions';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const ItemCategoriesList = ({item, data}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.reducers);
  const theme = useSelector(state => state.themeReducers);
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
      style={{
        width: itemWidth - 10,
        borderColor: 'grey',
        borderWidth: 0.3,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 5,
      }}>
      <TouchableOpacity
        onPress={() => {
          addItem(item);
        }}
        style={{padding: 10, alignItems: 'flex-end'}}>
        <FastImage
          style={{width: 20, height: 20}}
          source={
            isFavorite
              ? theme
                ? require('../assets/images/heart_fill.png')
                : require('../assets/images/heart_fill.png')
              : theme
              ? require('../assets/images/heart_fill_light.png')
              : require('../assets/images/heart.png')
          }
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
      <FastImage
        style={{width: '100%', height: 220}}
        source={{uri: item.src.original}}
        resizeMode={FastImage.resizeMode.cover}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme ? 'black' : 'white',
          }}>
          <ActivityIndicator size="small" color={theme ? 'white' : 'black'} />
        </View>
      )}
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
          <Text style={{color: theme ? 'white' : 'black', fontWeight: '500'}}>
            {item.photographer} {''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCategoriesList;
