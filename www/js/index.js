function init() {
  // api constants
  const API = {
    login: 'http://localhost:3000/api/login',
    logout: 'http://localhost:3000/api/logout',
    data: 'http://localhost:3000/api/data'
  };

  // fetch options
  const options = {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  };

  // login
  const loginButton = document.querySelector('#login');
  loginButton.addEventListener('click', e => {
    e.preventDefault();
    fetch(API.login, {
      method: 'POST',
      body: JSON.stringify({ password: 'SomeSecretPassword' }),
      ...options
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'inline';
      }
      else {
        loginButton.style.display = 'inline';
        logoutButton.style.display = 'none';
      }
    });
  });

  // logout
  const logoutButton = document.querySelector('#logout');
  logoutButton.addEventListener('click', e => {
    e.preventDefault();
    fetch(API.logout, { method: 'POST', ...options })
    .then(res => res.json())
    .then(() => {
      loginButton.style.display = 'inline';
      logoutButton.style.display = 'none';
      dataElement.innerText = '';
    });
  });

  // fetch
  const dataElement = document.querySelector('#data');
  document.querySelector('#fetch').addEventListener('click', e => {
    e.preventDefault();
    fetch(API.data, {
      method: 'GET',
      ...options
    })
    .then(res => res.json())
    .then(res => {
      dataElement.innerText = JSON.stringify(res.data, null, 2);
    });
  });
}

document.addEventListener('deviceready', init, false);
