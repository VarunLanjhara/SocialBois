export const posts = (posts = [], action) => {
  switch (action.type) {
    case "FETCH":
      return action.payload;
    case "CREATE":
      return [...posts, action.payload];
    case "DELETE":
      return posts.filter((post) => post._id !== action.payload);
    case "LIKE":
      return posts.map((post) => post._id === action.payload._id ? action.payload : post);
    default:
      return posts;
  }
};
