const app = require('express')();
app.use(require('cookie-parser')());
app.use(require('body-parser').json());

// server constants
const
  PORT = 3000,
  PASSWORD = {
    key: 'password',
    value: 'SomeSecretPassword'
  },
  REQUEST_ORIGINS = [
    // default scheme and hostname
    'ionic://localhost',
    // custom hostname
    'ionic://app',
    // custom scheme and hostname
    'httpsionic://app',
    'http://localhost:5000',
  ];

app.use(require('cors')({
  credentials: true,
  origin: REQUEST_ORIGINS
}));

// simple validator
function isPasswordValid(password) {
  return password === PASSWORD.value;
}

app
// fetch
.get('/api/data', (req, res) => {
  const password = req.cookies[PASSWORD.key];
  console.log(`[GET] Password Cookie: ${password}`);
  const isAuthenticated = isPasswordValid(password);
  res.json({
    success: isAuthenticated,
    data: {
      date: new Date(),
      origin: req.headers.origin,
      user: isAuthenticated
        ? { name: 'John Smith', passwordCookie: password }
        : 'Not authorized. Please login'
    }
  });
})
// login
.post('/api/login', (req, res) => {
  const password = req.body[PASSWORD.key];
  const validPassword = isPasswordValid(password);
  if (isPasswordValid(password)) {
    res.cookie(PASSWORD.key, PASSWORD.value, { httpOnly: true });
  }
  res.json({ success: validPassword });
})
// logout
.post('/api/logout', (req, res) => {
  res.cookie(PASSWORD.key, '', { httpOnly: true });
  res.json({ success: true });
})
// listen
.listen(PORT, () => console.log(`App listening on ${PORT}`));
