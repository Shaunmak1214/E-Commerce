import axios from "axios";
import {
  USER_AUTH,
  LOGOUT,
  SIGNUP,
  LOGIN,
  VERIFY_EMAIL,
  RESEND_EMAIL,
  UPDATE_USER,
  CLEAR_VERIFY,
} from "../ACTION_TYPES";

const PRESET = "b2meImages";
const CLOUD_URL = "https://api.cloudinary.com/v1_1/b2me/image/upload";

export async function auth() {
  const request = await axios.get("/api/auth").then((response) => {
    return response.data;
  });

  return {
    type: USER_AUTH,
    payload: request,
  };
}

export async function logout() {
  const request = await axios.get("/api/user/logout").then((response) => {
    return response.data;
  });

  return {
    type: LOGOUT,
    payload: request,
  };
}

export async function signUp(userdata) {
  const request = await axios
    .post("/api/user/register", userdata)
    .then((response) => {
      return response.data;
    });

  return {
    type: SIGNUP,
    payload: request,
  };
}

export async function login(userdata) {
  const request = await axios
    .post("/api/user/login", userdata)
    .then((response) => {
      return response.data;
    });

  return {
    type: LOGIN,
    payload: request,
  };
}

export async function confirmMail(token, id) {
  const request = await axios
    .get(`/api/user/confirmemail?id=${id}&token=${token}`)
    .then((response) => {
      return response.data;
    });

  return {
    type: VERIFY_EMAIL,
    payload: request,
  };
}

export async function resendEmail(email) {
  const request = await axios
    .post("/api/user/resendConfirmLink", { email })
    .then((response) => {
      return response.data;
    });

  return {
    type: RESEND_EMAIL,
    payload: request,
  };
}

async function uploadUserImage(imageSource) {
  let imageURL = "";

  const cloudinaryImages = async () => {
    let data = new FormData();
    data.append("file", imageSource);
    data.append("upload_preset", PRESET);
    await axios
      .post(CLOUD_URL, data)
      .then((response) => (imageURL = response.data.secure_url));
  };
  await cloudinaryImages();

  return imageURL;
}

export async function updateUser(userdetails, imageSource) {
  let imageURL = await uploadUserImage(imageSource);

  userdetails = { ...userdetails, imageURL };
  const request = await axios
    .post("/api/user/update", userdetails)
    .then((response) => {
      return response.data;
    });

  return {
    type: UPDATE_USER,
    payload: request,
  };
}

export async function clearVerify() {
  return {
    type: CLEAR_VERIFY,
    payload: null,
  };
}
