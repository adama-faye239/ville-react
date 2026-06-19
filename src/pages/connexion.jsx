import React, { useState } from 'react'
import keycloak from '../keycloak'

export const Connexion = () => {
  return (
    <button
      onClick={() => {
        // Vérifier le rôle de l'utilisateur après connexion
        keycloak.login({
          redirectUri: 'http://localhost:5173/'
        })
      }}
    >
      Se connecter
    </button>
  )
}
