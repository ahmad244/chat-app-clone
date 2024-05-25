import jwt from "jsonwebtoken";
function generateResponseObject(user) {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC,
    { expiresIn: "1w" }
  );

  const { password, ...others } = user._doc;
  return { ...others, accessToken };
}

function setTokenCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 604800000,
  });
}

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (token && token !== "null" && token !== "undefined") {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.user = user;

      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

export { generateResponseObject, setTokenCookie, verifyToken };
