import { StyleSheet } from 'react-native';

const ItemCategoriesStyles = StyleSheet.create({
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

export default ItemCategoriesStyles;
