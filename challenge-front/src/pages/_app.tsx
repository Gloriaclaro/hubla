import '@/styles/globals.css'
import '@/styles/TransactionsPage.css'
import '@/styles/FileUploader.css'
import '@/styles/Transactions.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component className="app" {...pageProps} />
}
