import React, { useState } from 'react'
import keycloak from '../keycloak'

export const Connexion = () => {
  
  return (
 <button
      onClick={() =>
        keycloak.login({
          redirectUri: 'http://localhost:5173/'
        })
      }
    >
      Se connecter
    </button>  )
}
