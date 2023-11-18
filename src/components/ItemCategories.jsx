import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

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
      style={[styles.container, {width: itemWidth}]}>
      <FastImage
        style={styles.image}
        source={{uri: item.image}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={styles.text}>{item.categories}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },

  text: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    zIndex: 1,
  },
});

export default ItemCategories;
