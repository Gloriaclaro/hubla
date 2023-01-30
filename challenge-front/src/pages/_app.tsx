import '@/styles/globals.css'
import '@/components/fileUploader.css'
import '@/components/transactions.css'
import '@/pages/transactions.css'
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component className="app" {...pageProps} />
}
