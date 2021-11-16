export const posts = (posts = [],action) => {
    switch(action.type){
        case "CREATE":
            return posts
        case "FETCH":
            return posts
        default:
            return posts
    }
}