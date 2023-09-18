export const oktaConfig = {
    clientId: '0oa9re97jgAYVLEIx5d7',
    issuer: 'https://dev-97607196.okta.com/oauth2/default',
    redirectUri: 'https://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true
}