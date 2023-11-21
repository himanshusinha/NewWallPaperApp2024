import {SafeAreaView, FlatList, Dimensions, Platform} from 'react-native';
import React from 'react';
import categories from '../../constants/list';
import ItemCategories from '../../components/ItemCategories';
import {useSelector} from 'react-redux';

const CategoriesScreen = () => {
  const {width} = Dimensions.get('window');
  const itemWidth = Platform.OS === 'ios' ? width / 2.18 : width / 2.16;
  const theme = useSelector(state => state.themeReducers);
  return (
    <SafeAreaView style={{backgroundColor: theme ? 'black' : 'white', flex: 1}}>
      <FlatList
        numColumns={2}
        data={categories}
        renderItem={({item}) => (
          <ItemCategories item={item} itemWidth={itemWidth} />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default CategoriesScreen;
