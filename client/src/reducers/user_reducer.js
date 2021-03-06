import {
  USER_AUTH,
  LOGOUT,
  SIGNUP,
  LOGIN,
  VERIFY_EMAIL,
  RESEND_EMAIL,
  UPDATE_USER,
  CLEAR_VERIFY,
  RESET_PASSWORD,
  RESET_PASSWORD_CONFIRMATION,
  MY_PROFILE,
  USER_LIST,
  ADD_USER_ADMIN,
  CLEAR_ADMIN_FUNC,
  PROMOTE_USER,
  DELETE_USER,
} from "../ACTION_TYPES";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case USER_AUTH:
      return { ...state, user: payload };
    case LOGOUT:
      return {
        ...state,
        user: payload,
        verification: { verified: false, linksent: null },
      };
    case SIGNUP:
      return {
        ...state,
        user: payload,
        verification: { verified: false, linksent: null },
      };
    case LOGIN:
      return {
        ...state,
        user: payload,
        verification: { verified: false, linksent: null },
      };
    case VERIFY_EMAIL: {
      if (payload.changeAuth === true)
        return {
          ...state,
          verification: payload.verification,
          user: payload.user,
        };
      else return { ...state, verification: payload };
    }
    case RESEND_EMAIL:
      return { ...state, verification: payload };
    case UPDATE_USER: {
      if (payload.update === true)
        return { ...state, update: true, user: { ...payload.user } };
      else return { ...state, update: false };
    }
    case CLEAR_VERIFY:
      return { ...state, verification: null, update: null };
    case RESET_PASSWORD:
      return { ...state, resetPasswordLink: payload };
    case RESET_PASSWORD_CONFIRMATION: {
      if (payload.expired !== null && payload.reset === false)
        return {
          ...state,
          resetPassword: { ...payload },
          user: { isAuth: false },
        };
      else if (payload.reset === false)
        return {
          ...state,
          resetPassword: { ...payload },
        };
      else
        return {
          ...state,
          resetPassword: { reset: true },
          user: { ...payload.user },
        };
    }
    case MY_PROFILE:
      return { ...state, myprofile: payload };
    case USER_LIST:
      return { ...state, userList: payload };
    case ADD_USER_ADMIN:
      return { ...state, adminActions: payload };
    case CLEAR_ADMIN_FUNC:
      return { ...state, adminActions: null };
    case PROMOTE_USER:
      return { ...state, adminActions: payload };
    case DELETE_USER:
      return { ...state, adminActions: payload };
    default:
      return state;
  }
};
