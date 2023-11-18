import {Dimensions, FlatList, SafeAreaView, View} from 'react-native';
import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import ItemFavourites from '../../components/ItemFavourites';
import LottieView from 'lottie-react-native';

const FavouriteScreen = () => {
  const items = useSelector(state => state.reducers);

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
        <LottieView
          source={require('../../assets/no_data_found.json')}
          autoPlay
          loop
          style={{width: 300, height: 300}}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={{height: '100%', backgroundColor: 'white'}}>
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
