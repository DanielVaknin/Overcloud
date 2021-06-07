export const environment = {
  production: true,

  // NodeJS URLs
  authUrl: 'http://overcloud-server:8080/api/auth',
  cloudAccountsUrl: 'http://overcloud-server:8080/api/cloud-accounts',

  // Python URLs
  recommendationsUrl: 'http://overcloud-recommendations:5000/recommendations',
  billingUrl: 'http://overcloud-recommendations:5000/cloud-accounts/billing',
  cloudAccountsPythonUrl: 'http://overcloud-recommendations:5000/cloud-accounts',
};
