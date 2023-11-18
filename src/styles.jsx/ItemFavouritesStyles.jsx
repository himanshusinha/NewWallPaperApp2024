import {StyleSheet} from 'react-native';

const ItemFavouritesStyles = StyleSheet.create({
  container: {
    borderColor: 'grey',
    borderWidth: 0.3,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  removeButtonContainer: {
    padding: 10,
    alignItems: 'flex-end',
  },
  removeButtonIcon: {
    width: 20,
    height: 20,
  },
  image: {
    width: '100%',
    height: 220,
  },
  photographerContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  photographerText: {
    color: 'black',
    fontWeight: '500',
  },
});

export default ItemFavouritesStyles;
