import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../store/reducers/authReducer';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const AppRouter = () => {
  const {getItem} = useAsyncStorage('auth');

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  console.log('Data from store', auth);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const res = await getItem();
    res && dispatch(addAuth(JSON.parse(res)));
    console.log('Data from local storage', res);
  };

  return <>{auth.accessToken ? <MainNavigator /> : <AuthNavigator />}</>;
};

export default AppRouter;
