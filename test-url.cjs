const https = require('https');

https.get('https://raw.githubusercontent.com/musclehed03/Remix-Dollhouse-Deviants-WebPage/main/public/dollhouse-sfw-logo.jpg', (res) => {
  console.log('statusCode:', res.statusCode);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
}).on('error', (e) => {
  console.error(e);
});
