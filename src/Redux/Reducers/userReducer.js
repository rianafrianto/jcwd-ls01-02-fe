const INITIAL_STATE = {
  isLogin: false,
  id: null,
  username: "",
  email: "",
  verified: 0,
  address_id: null,
  bod: null,
  fullname: "",
  profile_picture: null,
  cart: [],
  fav: [],
  error: false,
  error_mes: "",
  loading: false,
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
    case "ADDTOCART":
      return {
        ...state,
        ...action.payload,
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
    case "CHANGEADDRESS":
      return { ...state, address_id: action.payload };
    case "DELETECART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

export default userReducer;
