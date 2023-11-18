import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import ItemCategoriesStyles from '../styles.jsx/ItemCategoriesStyles';

const ItemCategories = ({item, itemWidth}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CategoriesList', {
          categories: item.categories,
        })
      }
      activeOpacity={0.1}
      style={[ItemCategoriesStyles.container, {width: itemWidth}]}>
      <FastImage
        style={ItemCategoriesStyles.image}
        source={{uri: item.image}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={ItemCategoriesStyles.text}>{item.categories}</Text>
    </TouchableOpacity>
  );
};

export default ItemCategories;
