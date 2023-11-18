import * as React from 'react';
import {StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';

import {Provider} from 'react-redux';
import AppNavigation from './src/navigation/Appnavigation';
import {persistor, store} from './src/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
