const baseCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    path: "/",
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  };
};

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const cookieDays = Math.max(1, Number(process.env.COOKIE_EXPIRE) || 7);

  res
    .status(statusCode)
    .cookie("token", token, {
      ...baseCookieOptions(),
      maxAge: cookieDays * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
};

sendToken.clear = (res) => {
  res.clearCookie("token", baseCookieOptions());
};

module.exports = sendToken;
