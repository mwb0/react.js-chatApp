const jwt = require("jsonwebtoken");
const APP_SECRET = "appsecret123";

const isLoggedIn = (resolve, parent, args, context, info) => {
  const Authorization = context.request.get("Authorization");
  // console.log();
  // if (context.connection) {
  //   // Context from subscriptions
  //   Authorization = context.connection.context.Authorization;
  // } else {
  //   // Context from queries and mutations
  //   Authorization = context.request.get("Authorization");
  // }

  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);

    return resolve({ userId, ...parent });
  }

  throw new AuthError();
};

class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

module.exports = { isLoggedIn };
