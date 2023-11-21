import {Dimensions, FlatList, SafeAreaView, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import ItemFavourites from '../../components/ItemFavourites';
import LottieView from 'lottie-react-native';

const FavouriteScreen = () => {
  const items = useSelector(state => state.reducers);
  const theme = useSelector(state => state.themeReducers);
  const renderItem = useMemo(() => {
    return ({item, index}) => {
      return <ItemFavourites item={item} index={index} />;
    };
  }, [items]);
  const renderEmptyComponent = () => {
    return (
      <View
        style={{
          height: Dimensions.get('window').height / 1.3,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: theme ? 'white' : 'black',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          No Favourites
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{height: '100%', backgroundColor: theme ? 'black' : 'white'}}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={renderEmptyComponent}
      />
    </SafeAreaView>
  );
};

export default FavouriteScreen;
