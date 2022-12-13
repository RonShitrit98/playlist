import { httpService } from "./http-service";

export const userService = {
  signup,
  login,
  loadUser,
  findUserById,
  logout,
  getEmptyUser,
  checkUsername,
  saveUser
};

async function signup(user) {
  try {
    return httpService.post("auth/signup", user, true);
  } catch (error) {
    console.log(error);
  }
}

async function login(creds) {
  return httpService.post("auth/login", creds, true);
}

async function findUserById(id) {
  // const users = await storageService.query(USER_KEY);
  // const user = users.find((user) => user._id === id);
  // return user;
}

async function loadUser() {
  return httpService.get("auth");
}

async function logout() {
  console.log("logging out");
  return httpService.post("auth/logout");
}

function getEmptyUser() {
  return {
    username: "",
    fullname: "",
    password: "",
    email: "",
    imgUrl: "",
    media: {
      movies: [],
      music: [],
    },
    type: "email",
    isActivated: false,
  };
}

function checkUsername(username) {
  console.log(username);
  return httpService.get(`user/check/${username}`);
}

function saveUser(user) {
  try {
    return httpService.put(`user/${user._id}`, user);
  } catch (error) {
    console.log(error);
  }
}
