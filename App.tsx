import React, {useEffect} from 'react';
import {LogBox, Text, StatusBar, TextInput} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';

import storage from './src/reducers/store';
import MainNavigator from './src/navigation/mainNavigator';

const {store, persistor} = storage();

/**disable warnings */
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />
        <MainNavigator />
        <Toast position="bottom" visibilityTime={2500} />
      </PersistGate>
    </Provider>
  );
};

export default App;
