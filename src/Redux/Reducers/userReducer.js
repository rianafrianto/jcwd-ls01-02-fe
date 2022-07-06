const INITIAL_STATE = {
  isLogin: false,
  username: "",
  email: "",
  verified: "",
  error: false,
  error_mes: "",
  loading: false,
  cart: [],
  fullname: "",
  profile_picture: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: false,
        error_mes: "",
      };
    case "LOGIN":
      return {
        ...state,
        isLogin: true,
        ...action.payload,
      };
    case "ERROR":
      return {
        ...state,
        error: true,
        error_mes: action.payload,
      };
    case "LOGOUT":
      return (state = INITIAL_STATE);
    case "DONE":
      return { ...state, loading: false };
    case "CLEARERROR":
      return { ...state, error: false, error_mes: "" };
    default:
      return state;
  }
};

export default userReducer;
