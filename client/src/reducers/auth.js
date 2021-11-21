export const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case "LOGOUT":
      localStorage.removeItem("profile");
      return { ...state, authData: null };
    case "GET_USER":
      return action.data;
    case "UPDATE_USER":
      return action.data;
    default:
      return state;
  }
};
