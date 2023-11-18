import React, {useEffect, useState, useCallback} from 'react';
import {View, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import ItemHome from '../../components/ItemHome';
import FavouriteScreen from '../Favourite/FavouriteScreen';
import CategoriesScreen from '../Categories/CategoriesScreen';
import SearchScreen from '../Search/SearchScreen';

let per_page = 20;

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    let query = `?page=${page}&per_page=${per_page}&orientation=portrait&size=large`;

    try {
      const res = await fetch('https://api.pexels.com/v1/curated' + query, {
        method: 'GET',
        headers: {
          Authorization:
            '563492ad6f91700001000001d4db4e2231f140c2aa37df6d8934cf5f',
        },
      });
      const jsonRes = await res.json();

      if (jsonRes.photos.length > 0) {
        setData([...data, ...jsonRes.photos]);
        setPage(page + 1);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = useCallback(
    ({item}) => {
      return <ItemHome item={item} />;
    },
    [data],
  );

  const onEndReached = () => {
    if (!loading) {
      fetchData();
    }
  };

  const renderFooter = () => {
    return loading ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    ) : null;
  };

  const Tab1Screen = () => {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          onEndReached={onEndReached}
          keyExtractor={item => item.id.toString()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          numColumns={2}
        />
      </View>
    );
  };

  const Tab2Screen = () => {
    return (
      <View style={{flex: 1}}>
        <CategoriesScreen />
      </View>
    );
  };
  const Tab3Screen = () => {
    return (
      <View>
        <FavouriteScreen />
      </View>
    );
  };
  const Tab4Screen = () => {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <SearchScreen />
      </View>
    );
  };
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            color: 'black',
          },
          tabBarIndicatorStyle: {
            backgroundColor: 'black',
          },
          tabBarStyle: {
            backgroundColor: 'white',
          },
        }}>
        <Tab.Screen name="Home" component={Tab1Screen} />
        <Tab.Screen name="Category" component={Tab2Screen} />
        <Tab.Screen name="Favourites" component={Tab3Screen} />
        <Tab.Screen name="Search" component={Tab4Screen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HomeScreen;
