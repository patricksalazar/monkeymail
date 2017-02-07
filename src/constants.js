const constants = {
  redirectUri: 'http://localhost:8000/authorize',
  microsoft: {
    credentials: {
      client: {
        id: '5ff56dad-1b0a-4dbd-acc7-63aedf691cea',
        secret: 'wJB48mNUkuWMgmhD1Mj3mMx',
      },
      auth: {
        tokenHost: 'https://login.microsoftonline.com',
        authorizePath: 'common/oauth2/v2.0/authorize',
        tokenPath: 'common/oauth2/v2.0/token'
      }
    },
    scopes : [ 'openid',
      'https://outlook.office.com/mail.read',
      'https://outlook.office.com/calendars.read',
      'https://outlook.office.com/contacts.read' ],
    outlook : {
      endpoint: 'https://outlook.office.com/api/v2.0'
    }
  }
};

export default constants;