import {View, Text, Modal, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const NoInternetModal = ({show}) => {
  const theme = useSelector(state => state.themeReducers);
  return (
    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', flex: 1}}>
      <Modal
        isVisible={show}
        transparent={true}
        style={{flex: 1, backgroundColor: 'transparent'}}
        animationInTiming={600}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end',
          }}>
          <View style={styles.modalContainer(theme)}>
            <Text style={styles.modalTitle(theme)}>Connection Error</Text>
            <Text style={styles.modalText(theme)}>
              Oops! Looks like your device is not connected to the Internet.
            </Text>
            <Text style={styles.modalTextSmile(theme)}>😔</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: theme => ({
    backgroundColor: theme ? 'black' : 'white',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  modalTitle: theme => ({
    fontSize: 18,
    color: theme ? 'white' : 'black',
    marginTop: 30,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  }),
  modalText: theme => ({
    fontSize: 16,
    color: theme ? 'white' : 'black',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 30,
    marginHorizontal: 10,
  }),
  modalTextSmile: theme => ({
    fontSize: 35,
    color: theme ? 'white' : 'black',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  }),
});

export default NoInternetModal;
