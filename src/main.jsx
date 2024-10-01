import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './containers/App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)