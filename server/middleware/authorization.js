export const authorization = (requiredRole) => (req, res, next) => {
  try {
    console.log("User Role:", req.user?.role);

    if (!req.user || req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: `Access denied: ${requiredRole}s only` });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
