const INITIAL_STATE = {
  isLogin: false,
  username: "",
  email: "",
  verified: "",
  cart: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLogin: true,
        ...action.payload,
      };
    case "LOGOUT":
      return (state = INITIAL_STATE);
    default:
      return state;
  }
};

export default userReducer;
