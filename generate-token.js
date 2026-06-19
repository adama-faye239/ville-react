import crypto from 'crypto';

// Génère un JWT de test avec rôle admin
// ATTENTION: À utiliser UNIQUEMENT en développement!

const header = {
  alg: 'HS256',
  typ: 'JWT'
};

const payload = {
  sub: 'admin',
  iss: 'http://localhost:8080/realms/premier-essai',
  aud: 'premier-app',
  preferred_username: 'admin',
  realm_access: {
    roles: ['admin', 'user']
  },
  exp: Math.floor(Date.now() / 1000) + 3600, // 1 heure
  iat: Math.floor(Date.now() / 1000)
};

const secret = 'your-secret-key-change-this';

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const encodedHeader = base64UrlEncode(JSON.stringify(header));
const encodedPayload = base64UrlEncode(JSON.stringify(payload));

const signature = crypto
  .createHmac('sha256', secret)
  .update(`${encodedHeader}.${encodedPayload}`)
  .digest('base64')
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=/g, '');

const token = `${encodedHeader}.${encodedPayload}.${signature}`;

console.log('Token JWT généré:');
console.log(token);
console.log('\nPayload décodé:');
console.log(payload);
console.log('\nUtilise ce token pour tester:');
console.log(`curl.exe -X GET "http://127.0.0.1:8000/api/demandes" -H "Authorization: Bearer ${token}"`);
