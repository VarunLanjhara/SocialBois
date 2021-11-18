export const posts = (posts = [], action) => {
  switch (action.type) {
    case "FETCH":
      return action.payload;
    case "CREATE":
      return [...posts, action.payload];
    case "DELETE":
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};
