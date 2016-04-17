// conFusionClientID and conFusionClientSecret need to be set manually.
// If they were included here they would show up on GitHub.

module.exports = {
  'secretKey': '12345-67890-09876-54321',
  'mongoUrl': 'mongodb://localhost:27017/conFusion',
  'facebook': {
    clientID: process.env.conFusionClientID,  // 'YOUR FACEBOOK APP ID'
    clientSecret: process.env.conFusionClientSecret,  // 'YOUR FACEBOOK SECRET'
    callbackURL: 'https://fswd5-server-smathx.c9users.io/users/facebook/callback'
  }
};
