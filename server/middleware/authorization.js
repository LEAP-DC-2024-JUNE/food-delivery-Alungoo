//permission

export const authorization = (role) => (req, res, next) => {
  try {
    const user = req.body.user;
    if (user.role !== role) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
