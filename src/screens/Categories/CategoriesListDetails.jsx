import {useRoute} from '@react-navigation/native';
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import {useSelector} from 'react-redux';
let theme = '';
const CategoriesListDetails = () => {
  const route = useRoute();
  const [selectedImages, setSelectedImages] = useState([]);
  const selectedImage = route.params.selectedImage;
  const [progress, setProgress] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);
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

      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
          'Your file has been downloaded!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }

      // Open the downloaded file
      if (Platform.OS === 'ios') {
        const options = {
          type: 'image/jpeg',
          url: `file://${fileUri}`,
        };
        await Share.open(options);
      } else if (Platform.OS === 'android') {
        const mimeType = 'application/pdf';
        const intentType = `application/${mimeType.split('/')[1]}`;
        const intent = RNFetchBlob.android.actionViewIntent(
          fileUri,
          intentType,
        );

        if (intent) {
          RNFetchBlob.android.actionViewIntent(intent, intentType);
        } else {
          Alert.alert(
            'Error',
            'No app found to open this file. Please install a suitable app.',
          );
        }
      }
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
        type: 'image/jpeg', // Change the type based on your image format
        url: `data:image/jpeg;base64,${base64Data}`,
      };

      await Share.open(options);
    } catch (error) {
      console.error('Error sharing image', error);
    }
  };

  useEffect(() => {
    const initialIndex = selectedImages.findIndex(
      image => image === selectedImage,
    );

    if (initialIndex !== -1) {
      setCurrentIndex(initialIndex);
      flatListRef.current.scrollToIndex({index: initialIndex, animated: false});
    }
  }, [selectedImages, selectedImage]);

  const handleSwipe = index => {
    setCurrentIndex(index);
  };

  if (
    !selectedImages ||
    !Array.isArray(selectedImages) ||
    selectedImages.length === 0
  ) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No images available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{backgroundColor: theme ? 'black' : 'white'}}>
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
              backgroundColor: theme ? 'black' : 'white',
              borderRadius: 50,
              borderWidth: 3,
              borderColor: 'white',
            },
          ]}>
          {progress ? (
            <ActivityIndicator size="large" color={'white'} />
          ) : (
            <Image
              style={{width: 20, height: 20}}
              source={
                theme
                  ? require('../../assets/images/download_light.png')
                  : require('../../assets/images/downloads.png')
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
              backgroundColor: theme ? 'black' : 'white',
              borderRadius: 50,
              borderWidth: 3,
              borderColor: 'white',
            },
          ]}>
          <Image
            style={{width: 20, height: 20}}
            source={
              theme
                ? require('../../assets/images/share_light.png')
                : require('../../assets/images/share.png')
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
    backgroundColor: theme ? 'white' : 'black',
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
    backgroundColor: theme ? 'light' : 'black',
    borderRadius: 20,
  },
});

export default CategoriesListDetails;
