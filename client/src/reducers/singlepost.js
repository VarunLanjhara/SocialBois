export const singlepost = (post = {}, action) => {
  switch (action.type) {
    case "FETCH_SINGLE":
      return action.payload;
    case "POST_COMMENT":
      return {
        ...post,
        comments: action.data.comments,
      };
    default:
      return post;
  }
};
