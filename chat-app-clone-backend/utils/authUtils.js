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

export { generateResponseObject, setTokenCookie };
