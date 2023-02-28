import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store from '../redux/store';
import Toast from '../utils/Toast';
import ValidateUserInfo from '@/utils/validateUserInfo';

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <Component {...pageProps} />
    <ValidateUserInfo/>
    <Toast/>
  </Provider>
}
