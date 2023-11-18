import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import ItemSearch from '../../components/ItemSearch';
import LottieView from 'lottie-react-native';
import SearchScreenStyles from '../../styles.jsx/SearchScreenStyles';

let per_page = 20;

const SearchScreen = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [noDataFound, setNoDataFound] = useState(false);

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    let searchQuery = `?query=${query}&page=${page}&per_page=${per_page}`;

    try {
      const res = await fetch(
        'https://api.pexels.com/v1/search' + searchQuery,
        {
          method: 'GET',
          headers: {
            Authorization:
              '563492ad6f91700001000001d4db4e2231f140c2aa37df6d8934cf5f',
          },
        },
      );
      const jsonRes = await res.json();

      if (jsonRes.photos && jsonRes.photos.length > 0) {
        setData(prevData => [...prevData, ...jsonRes.photos]);
        setPage(page + 1);
        setNoDataFound(false);
      } else {
        setNoDataFound(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = useCallback(
    ({item}) => {
      return <ItemSearch item={item} data={data} />;
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
      <View style={SearchScreenStyles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    ) : null;
  };

  const clearSearchData = () => {
    setData([]);
    setNoDataFound(false);
  };

  return (
    <View style={SearchScreenStyles.container}>
      <View>
        <View style={SearchScreenStyles.searchInputContainer}>
          <Image
            style={SearchScreenStyles.searchIcon}
            source={require('../../assets/images/search.png')}
          />
          <TextInput
            onChangeText={text => setQuery(text)}
            onEndEditing={clearSearchData}
            value={query}
            placeholder="Search Photos "
            style={SearchScreenStyles.searchInput}
          />
        </View>
      </View>

      <View style={SearchScreenStyles.container}>
        {noDataFound ? (
          <View style={SearchScreenStyles.noDataFoundContainer}>
            <LottieView
              source={require('../../assets/no_data_found.json')}
              autoPlay
              loop
              style={SearchScreenStyles.lottieView}
            />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            onEndReached={onEndReached}
            keyExtractor={item => item.id.toString()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
            numColumns={2}
          />
        )}
      </View>
    </View>
  );
};

export default SearchScreen;
