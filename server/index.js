const express = require('express'); // Express web server framework
const cors = require('cors');
const app = express();
const path = require('path');
const querystring = require('query-string');
const axios = require('axios');
const bodyParser = require('body-parser');
const qs = require('qs');
//const port = process.env.PORT || 8888;
const port = 8080;
const auth_url = 'https://accounts.spotify.com/authorize';
const client_id = 'da01e8cca0df4d12a3ec66ff2f62c9e2';
const client_secret = 'c28592487eaa47f4ab61b650b5259eb7';
const redirect_uri = 'http://localhost:8080/callback';
const scope = 'user-read-private user-read-email';
// app.use(express.static(__dirname + '/public'));

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });

app.use(bodyParser.urlencoded({ extended: false }));
const generateStateKey = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
app.get('/login', (req, res, next) => {
  res.send('logged in');
});
const storedState = generateStateKey(16);
app.get('/', async (req, res, next) => {
  try {
    await res.redirect(
      `${auth_url}?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}&show_dialog=${true}&state=${storedState}`
    );
  } catch (err) {
    next(err);
  }
});
app.get('/callback', async (req, res, next) => {
  let code = req.query.code;
  let state = req.query.state;

  if (state !== storedState) {
    //have an error message
    //res.redirect('/#?error=state_match');
  }
  const token_uri = 'https://accounts.spotify.com/api/token';
  const body = qs.stringify({
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: redirect_uri,
    client_id: client_id,
    client_secret: client_secret,
  });

  try {
    const response = await axios.post(token_uri, body);
    const access_token = await response.data.access_token;
    let refresh_token = await response.data.refresh_token;
    //const header = { Authorization: `Bearer ${access_token}` };
    await res.redirect(`/login?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    console.log(error);
  }
});
app.get('/refresh_token', (req, res) => {
  let refresh_token = req.query.refresh_token;
  res.send('refresh');
});

console.log(`Listening on PORT ${port}`);
app.listen(8080);
