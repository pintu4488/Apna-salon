import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Tests from './testing.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    <Tests/>
    <App />
     </>
    </StrictMode>
)
