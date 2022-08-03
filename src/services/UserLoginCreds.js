let USER_KEY = "user";

const userSetLoginCreds = (username) => {
  localStorage.setItem(USER_KEY, username);
};

const userGetLoginCreds = () => {
  return localStorage.getItem(USER_KEY);
};

export { userSetLoginCreds, userGetLoginCreds };
