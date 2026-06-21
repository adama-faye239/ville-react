import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import logo from './assets/logo.png'
import {Accueil} from './pages/accueil'
import { Apropos } from './pages/Apropos'
import { Contact } from './pages/contact'
import { Demandes} from './pages/demandes'
import {Connexion} from './pages/connexion'
import {Inscription} from './pages/inscription'
import {ListeDemandes} from './pages/ListeDemandes'
import keycloak from './keycloak'



export default function App() {
if (keycloak.authenticated) {             /** test temporaire pour keycloak */
    console.log("Token :", keycloak.token)
  }
   const roles = keycloak.tokenParsed?.realm_access?.roles || [];
   const isAdmin = roles.includes("Admin");
  return (
<div>
      <nav>
        <img src={logo} alt="logo" width="50" />

        <ul>
          <li>
          <Link to="/">Accueil</Link>
          </li>
          <li>
            {/* <Link to="/Apropos">A propos</Link> */}
          </li>

          <li>
            <Link to="/demandes">Demandes</Link>
          </li>
           <li>

          <Link to="/ListeDemandes">
          {isAdmin ? "Liste des demandes" : "Mes demandes"}
          </Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/connexion">Login</Link>
          </li>
          <li>
            <Link to="/inscription">Inscription</Link>
          </li>
          <li>
    {keycloak.authenticated
      ? `Bonjour ${keycloak.tokenParsed?.preferred_username}`
      : 'Non connecté'}
  </li>

  <li>
    {keycloak.authenticated && (
      <button onClick={() => keycloak.logout()}>
        Déconnexion
      </button>
    )}
  </li>
        </ul>
      </nav>

 <div>
      
    
    </div>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/Apropos" element={<Apropos />} />
        <Route path="/demandes" element={<Demandes />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/ListeDemandes" element={<ListeDemandes />} />
      </Routes>
    </div>


   

  );
}

  


