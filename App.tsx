import React from 'react';
import {LogBox, Text, StatusBar, TextInput} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

import storage from './src/reducers/store';
import MainNavigator from './src/navigation/mainNavigator';

const {store, persistor} = storage();

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

/**disable warnings */
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App:React.FC = () => {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar
            translucent
            backgroundColor={'transparent'}
            barStyle={'dark-content'}
          />
          <MainNavigator />
          <Toast position="bottom" visibilityTime={2000} />
        </PersistGate>
      </Provider>
  );
};

export default App;