import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const customAuth = token.length < 500;

    let decodeData;

    if (token && customAuth) {
      decodeData = jwt.verify(token, "blahblah");
      req.userId = decodeData.id;
    } else {
      decodeData = jwt.decode(token);
      req.userId = decodeData?.sub;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;
