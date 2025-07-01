import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout'; // Assuming Layout.tsx is in src/components
import { Toaster } from 'react-hot-toast'; // Added Toaster here

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </Layout>
  );
}