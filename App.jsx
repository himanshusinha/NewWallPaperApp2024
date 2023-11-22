import * as React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Routes from './src/navigation/Routes';
import NetInfo from '@react-native-community/netinfo';
import NoInternetModal from './src/components/NoInternetModel';
const App = () => {
  const [isOffline, setOfflineStatus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    getNetWorkInfo();
    return () => removeNetInfoSubscription();
  }, [isOffline]);

  const getNetWorkInfo = React.useCallback(() => {
    setLoading(true);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {isOffline ? (
            <>
              <NoInternetModal  show={isOffline} isRetrying={loading} />
            </>
          ) : (
            <Routes />
          )}
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
