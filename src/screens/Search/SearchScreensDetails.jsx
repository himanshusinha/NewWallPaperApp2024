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
import styles from '../../styles.jsx/SearchScreenDetailsStyles';

const SearchScreensDetails = () => {
  const route = useRoute();
  const [selectedImages, setSelectedImages] = useState([]);
  const selectedImage = route.params.selectedImage;
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const [progress, setProgress] = useState(false);

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

  const requestStoragePermission = async () => {
    try {
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
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const actualDownload = async () => {
    const storagePermissionGranted = await requestStoragePermission();

    if (!storagePermissionGranted) {
      return;
    }

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

      if (response.info().status === 200) {
        setLoading(false);
        ToastAndroid.showWithGravity(
          'Your file has been downloaded!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        // Open the downloaded file
      } else {
        setLoading(false);
        console.error(
          'Failed to download image. Status:',
          response.info().status,
        );
      }
    } catch (error) {
      setLoading(false);
      console.error('Error downloading image', error);
    }
  };

  const handleShare = async () => {
    const storagePermissionGranted = await requestStoragePermission();

    if (!storagePermissionGranted) {
      return;
    }

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

  return (
    <SafeAreaView style={styles.container}>
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
              backgroundColor: '#0e1116',
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
              source={require('../../assets/images/download.png')}
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
              backgroundColor: '#0e1116',
              borderRadius: 50,
              borderWidth: 3,
              borderColor: 'white',
            },
          ]}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/images/share.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreensDetails;
