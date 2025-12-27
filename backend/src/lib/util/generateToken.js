import jwt from 'jsonwebtoken';

export const generateTokenSetCookie = (userId, res) => {
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not set");
    throw new Error("JWT_SECRET is not set");
  }
  console.log("Generating token for userId:", userId);
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting
    sameSite: 'strict', // CSRF attacks cross-site request forgery
    secure: process.env.NODE_ENV !== 'development',
  });
};
