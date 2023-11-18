import {StyleSheet} from 'react-native';

const SearchScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchInputContainer: {
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    paddingStart: 20,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    paddingStart: 20,
    fontSize: 16,
  },
  noDataFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width: 300,
    height: 300,
  },
});

export default SearchScreenStyles;
