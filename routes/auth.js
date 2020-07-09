const jwt = require("express-jwt");

const getTokenFromHeaders = req => {
  const {
    headers: { authorization }
  } = req;
  // console.log(headers);

  // console.log("JWT", req.headers.authorization);
  var auth = authorization;
  var value = auth.split(" ")[0];
  console.log("split value", value === "Token");
  console.log("auth", auth);
  console.log("split", authorization.split(" ")[0] === "Token");
  if (authorization && authorization.split(" ")[0] === "Token") {
    console.log("inside if ");
    return authorization.split(" ")[1];
  }
  console.log("outside if ....");
  return null;
};
// {
//   if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//       return req.headers.authorization.split(' ')[1];
//   } else if (req.query && req.query.token) {
//     return req.query.token;
//   }
//   return null;
// }

const auth = {
  required: jwt({
    secret: "secret",
    userProperty: "payload",
    getToken: getTokenFromHeaders
  }),

  optional: jwt({
    secret: "secret",
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
};

module.exports = auth;
