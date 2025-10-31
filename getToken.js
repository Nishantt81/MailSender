require('dotenv').config();
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Generate the auth URL
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline', // important to get a refresh token
  scope: ['https://www.googleapis.com/auth/gmail.send'],
});

console.log('Authorize this app by visiting this url:', authUrl);
