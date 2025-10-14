import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import  {Store}  from './app/store.ts';

import { Provider }  from "react-redux"
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={Store}>
    <App />
    <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  </StrictMode>,
)
