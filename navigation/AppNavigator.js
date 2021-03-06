import React from 'react';
import {useSelector} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import {ParkAssDrawer, AuthNavigator} from './ParkAssNavigation';
import StartupScreen from '../screens/StartUpScreen';

const AppNavigator = (props) => {
    const isAuth = useSelector(state => !!state.auth.token);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

    return(
        <NavigationContainer>
            {isAuth && <ParkAssDrawer />}
            {!isAuth && didTryAutoLogin && <AuthNavigator />}
            {!isAuth && !didTryAutoLogin && <StartupScreen />}
        </NavigationContainer>
    );
}

export default AppNavigator;