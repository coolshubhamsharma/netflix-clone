import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/*wrapping the app component inside the browser router so that we can use the react-router-dom properties and methods inside the app component */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
