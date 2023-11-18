import {StyleSheet} from 'react-native';

const CategoriesListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerContainer: {
    padding: 10,
    alignItems: 'center',
  },
  loadingIndicator: {
    size: 'medium',
    color: 'black',
  },
});

export default CategoriesListStyles;
