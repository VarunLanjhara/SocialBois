export const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case "LOGOUT":
      localStorage.removeItem("profile");
      return { ...state, authData: null };
    case "UPDATE_USER":
      return action.data;
    case "USER_BYID":
      return action.data;
    case "FOLLOW_USER":
      return {
        ...state,
        followers: action.data.followers,
        following: action.data.following,
      };
    default:
      return state;
  }
};
