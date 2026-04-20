const https = require('https');

const apiKey = 'AIzaSyAL281STT9a6n0QVwq1Tul6ZP5Ec5_HZO0';
const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`;

const req = https.request(url, { method: 'POST' }, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Body:', data);
  });
});

req.on('error', (e) => console.error(e));
req.write(JSON.stringify({ token: 'test', returnSecureToken: true }));
req.end();
