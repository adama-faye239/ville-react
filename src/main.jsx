import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import keycloak from './keycloak'

keycloak.init({
  onLoad: 'check-sso'
}).then((authenticated) => {

  console.log("Authentifié :", authenticated)
  console.log("Token :", keycloak.token)

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  )

}).catch((error) => {
  console.error("Erreur Keycloak :", error)
})