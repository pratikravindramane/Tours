const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const College = require("../model/College");
const Tour = require("../model/Tour");
const Admin = require("../model/Admin");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    if (token) {
      try {
        const decode = jwt.verify(token, process.env.JWT);
        let user = await Admin.findById(decode.id);

        if (!user) {
          // If user is not found in User model, check Tour model
          user = await Tour.findById(decode.id);

          if (!user) {
            // If user is not found in Tour model, check College model
            user = await College.findById(decode.id);

            if (!user) {
              throw new Error("User not found");
            }
          }
        }

        req.user = user;
        next();
      } catch (error) {
        throw new Error("Invalid Token");
      }
    } else {
      throw new Error("Invalid Token");
    }
  } else {
    throw new Error("You don't have a token to access this route");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const isAdmin = await Admin.findById(req?.user?._id);
  if (isAdmin) next();
  else throw new Error("Not Authozired");
});

module.exports = { authMiddleware, isAdmin };
