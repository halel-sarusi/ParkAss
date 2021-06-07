import 'react-native-gesture-handler';
import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import reportReducer from './store/reducers/report';
import { createStore, combineReducers, applyMiddleware } from 'redux';


const rootReducer = combineReducers({
  auth: authReducer,
  report: reportReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
