import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, Persistor } from 'redux-persist';
import type { AppProps } from 'next/app';
import store from '@/redux/store'; // Asegúrate de importar el store correcto aquí
import { AuthProvider } from '@/context/auth';
import 'reflect-metadata';

function MyApp({ Component, pageProps }: AppProps) {
  const [persistor, setPersistor] = useState<null | Persistor>(null);

  useEffect(() => {
    setPersistor(persistStore(store));
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        {persistor && (
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        )}
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
