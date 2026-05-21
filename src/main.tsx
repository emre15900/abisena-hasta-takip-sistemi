import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { store } from './store'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '8px',
          },
        }}
      />
      <App />
    </Provider>
  </StrictMode>,
)
