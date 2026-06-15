import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'premier-essai',
  clientId: 'premier-app'
})

export default keycloak