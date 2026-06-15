// import React, { useState } from 'react'
// import keycloak from '../keycloak'

// export const Inscription = () => {
//   return (
//     <button onClick={() => keycloak.register()}>
//       S'inscrire
//     </button>
//   )
// }
import { useEffect } from 'react'
import keycloak from '../keycloak'

export const Inscription = () => {

  useEffect(() => {
    keycloak.register({
      redirectUri: 'http://localhost:5173/'
    })
  }, [])

  return null
}