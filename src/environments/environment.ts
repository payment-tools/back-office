export const environment = {
  production: false,
  envName: 'local',
  keycloak: {
    issuer: 'http://localhost:8080/',
    realm: 'onepay',
    clientId: 'onepay-client',
  },
  baseUrl: 'http://localhost:8086'
};
