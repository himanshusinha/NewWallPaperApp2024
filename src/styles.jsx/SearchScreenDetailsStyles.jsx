import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'black',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: '50%',
  },
  image: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'transparent',
  },
  closeLineContainer: {
    alignSelf: 'center',
  },
  closeLine: {
    width: 60,
    textAlign: 'center',
    alignItems: 'center',
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    marginTop: 9,
  },
  btnContainer: {
    height: 50,
    width: 50,
    marginHorizontal: 10,
  },
  headerText: {
    marginTop: 10,
    marginLeft: 40,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonListContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
  },
  whiteText: {
    color: 'white',
    fontSize: 15,
    marginLeft: 10,
  },
  wallpaperOption: {
    marginHorizontal: 10,
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    gap: 55,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#36414F',
    borderRadius: 20,
  },
});

export default styles;
