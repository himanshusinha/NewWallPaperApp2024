import {StyleSheet} from 'react-native';

const ItemSearchStyles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: 'grey',
    borderWidth: 0.3,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  favoriteButtonContainer: {
    padding: 10,
    alignItems: 'flex-end',
  },
  favoriteButtonIcon: {
    width: 20,
    height: 20,
  },
  image: {
    width: '100%',
    height: 220,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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

export default ItemSearchStyles;
