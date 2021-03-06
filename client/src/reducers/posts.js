export const posts = (posts = [], action) => {
  switch (action.type) {
    case "FETCH":
      return action.payload;
    case "CREATE":
      return action.payload;
    case "UPDATE":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "DELETE":
      return posts.filter((post) => post._id !== action.payload);
    case "LIKE":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    // case "POST_COMMENT":
    //   return {
    //     ...posts,
    //     comments: action.data.comments,
    //   };
    case "SEARCH":
      return action.data;
    case "FETCH_TRENDING":
      return action.payload;
    // case "FETCH_SINGLE":
    //   return action.payload;
    case "GET_USER_POSTS":
      return action.data;
    default:
      return posts;
  }
};
