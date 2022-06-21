const INITIAL_STATE = {
  isLogin: false,
  username: "",
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
