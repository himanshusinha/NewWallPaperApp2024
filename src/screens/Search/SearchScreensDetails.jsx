import {useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  ActivityIndicator,
  Platform,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import {useSelector} from 'react-redux';
let theme = '';
const SearchScreensDetails = () => {
  const route = useRoute();
  const [selectedImages, setSelectedImages] = useState([]);
  const selectedImage = route.params.selectedImage;
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const [progress, setProgress] = useState(false);
  theme = useSelector(state => state.themeReducers);
  useEffect(() => {
    setSelectedImages(route.params.selectedImages || []);
  }, [route.params.selectedImages]);

  useEffect(() => {
    const initialIndex = selectedImages.findIndex(
      image => image === selectedImage,
    );

    if (initialIndex !== -1) {
      setCurrentIndex(initialIndex);
      flatListRef.current.scrollToIndex({
        index: initialIndex,
        animated: false,
      });
    }

    // Opening the sheetRef once the component is mounted
  }, [selectedImages, selectedImage]);

  const handleSwipe = index => {
    setCurrentIndex(index);
  };

  const actualDownload = async () => {
    setLoading(true);

    const currentImage = selectedImages[currentIndex];
    const fileName = currentImage.substring(currentImage.lastIndexOf('/') + 1);
    const fileUri =
      Platform.OS === 'ios'
        ? RNFS.CachesDirectoryPath + `/${fileName}`
        : RNFS.ExternalStorageDirectoryPath + `/Download/${fileName}`;

    try {
      const response = await RNFetchBlob.config({
        path: fileUri,
        fileCache: true,
      }).fetch('GET', currentImage, {});

      setLoading(false);
      ToastAndroid.showWithGravity(
        'Your file has been downloaded!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );

      // Open the downloaded file
    } catch (error) {
      setLoading(false);
      console.error('Error downloading image', error);
    }
  };
  const downloadFile = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to memory to download the file',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied!',
            'You need to give storage permission to download the file',
          );
          return;
        }
      }

      await actualDownload();
    } catch (err) {
      console.error(err);
    }
  };
  const handleShare = async () => {
    try {
      const currentImage = selectedImages[currentIndex];

      const response = await RNFetchBlob.fetch('GET', currentImage);
      const base64Data = response.base64();

      const options = {
        title: 'Share Image',
        subject: 'Download image and set as your wallpaper ',
        message: 'Download image and set as your wallpaper',
        type: 'image/jpeg',
        url: `data:image/jpeg;base64,${base64Data}`,
      };

      await Share.open(options);
    } catch (error) {
      console.error('Error sharing image', error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, (backgroundColor = theme ? 'black' : 'theme')]}>
      <SwiperFlatList
        ref={flatListRef}
        data={selectedImages}
        index={currentIndex}
        renderItem={({item}) => (
          <View style={styles.slide}>
            <View>
              <Image
                source={{uri: item}}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </View>
        )}
        onChangeIndex={({index}) => handleSwipe(index)}
        showPagination={false}
      />

      <View
        style={{
          width: Dimensions.get('window').width,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          backgroundColor: theme ? 'black' : 'white',
        }}>
        <TouchableOpacity
          onPress={actualDownload}
          style={[
            styles.btnContainer,
            {
              height: 50,
              width: 50,
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: theme ? 'white' : 'black',
              borderRadius: 50,
              borderWidth: 3,
              borderColor: 'grey',
            },
          ]}>
          {progress ? (
            <ActivityIndicator size="large" color={theme ? 'white' : 'black'} />
          ) : (
            <Image
              style={{width: 20, height: 20}}
              source={
                theme
                  ? require('../../assets/images/downloads.png')
                  : require('../../assets/images/download_light.png')
              }
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleShare();
          }}
          style={[
            styles.btnContainer,
            {
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: theme ? 'white' : 'black',
              borderRadius: 50,
              borderWidth: 3,
              borderColor: 'grey',
            },
          ]}>
          <Image
            style={{width: 20, height: 20}}
            source={
              theme
                ? require('../../assets/images/share.png')
                : require('../../assets/images/share_light.png')
            }
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: theme ? 'black' : 'white',
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

export default SearchScreensDetails;
