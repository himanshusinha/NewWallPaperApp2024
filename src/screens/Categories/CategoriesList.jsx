import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useRoute} from '@react-navigation/core';
import ItemCategoriesList from '../../components/ItemCategoriesList';
import {useSelector} from 'react-redux';

let per_page = 20;

const CategoriesList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const routes = useRoute();
  const theme = useSelector(state => state.themeReducers);
  const categories = routes?.params?.categories;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    let query = `?query=${categories}&page=${page}&per_page=${per_page}`;

    try {
      const res = await fetch('https://api.pexels.com/v1/search' + query, {
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
      return <ItemCategoriesList item={item} data={data} />;
    },
    [data],
  );

  const onEndReached = () => {
    if (loading) {
      fetchData();
    }
  };

  const renderFooter = () => {
    return loading ? (
      <View style={{padding: 10, alignItems: 'center'}}>
        <ActivityIndicator size="medium" color={theme ? 'white' : 'black'} />
      </View>
    ) : null;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme ? 'black' : 'white'}}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: theme ? 'white' : 'black',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              {categories}
            </Text>
          </View>
        )}
        data={data}
        renderItem={renderItem}
        onEndReached={onEndReached}
        keyExtractor={item => item.id.toString()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default CategoriesList;
