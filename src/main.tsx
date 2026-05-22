import { Provider } from 'react-redux'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeAwareToaster } from './components/ThemeAwareToaster.tsx'
import { store } from './store'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeAwareToaster />
      <App />
    </Provider>
  </StrictMode>,
)
