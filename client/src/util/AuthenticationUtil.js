export function saveAuth(info) {
  const { id, username } = info;

  let isUser = false, isAdmin = false;
  if (info.roles[0].name === "ROLE_USER"){
    isUser = true;
  }
  else{
    isAdmin = true;
  }

  const authJson = { id, username, isUser, isAdmin };

  localStorage.setItem("authInfo", JSON.stringify(authJson));
}

export function cleanAuth() {
  localStorage.removeItem("authInfo");
}

export function expireAuth() {
  localStorage.setItem("authExpired", true);
  cleanAuth();
}

export function isExpired() {
  let exp = localStorage.getItem("authExpired");
  if (exp) {
    localStorage.removeItem("authExpired");
    return true;
  }
  return false;
}

export function isAuthenticated() {
  let auth = localStorage.getItem("authInfo");
  return auth != null;
}

export function getAuthId() {
  let auth = localStorage.getItem("authInfo");
  let authJson = JSON.parse(auth);
  return authJson.id;
}

export function getAuthName() {
  let auth = localStorage.getItem("authInfo");
  let authJson = JSON.parse(auth);
  return authJson.username;
}

export function isAdmin() {
  let auth = localStorage.getItem("authInfo");
  let authJson = JSON.parse(auth);
  return authJson.isAdmin;
}

export function isUser() {
  let auth = localStorage.getItem("authInfo");
  let authJson = JSON.parse(auth);
  return authJson.isUser;
}
