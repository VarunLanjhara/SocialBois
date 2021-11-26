export const profileReducer = (state = { profileData: null }, action) => {
  switch (action.type) {
    case "GET_USER":
      return action.data;
    default:
      return state;
  }
};
