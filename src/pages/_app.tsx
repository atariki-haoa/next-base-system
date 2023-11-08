import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import type { AppProps } from 'next/app';
import store from '../redux/store'; // Asegúrate de importar el store correcto aquí
import { AuthProvider } from '@/context/auth';
import 'reflect-metadata';

const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
