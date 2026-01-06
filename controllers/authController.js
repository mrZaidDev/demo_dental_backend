import jwt from "jsonwebtoken";

export const verify = (req, res) => {
  res.status(200).json({
    message: "Token is valid",
    user: req.user,
  })
}

export const login =  (req, res) => {
  const { password } = req.body;
  if (!password) res.status(404).json({ message: "Provide the password" });
  try {
    if (password === process.env.PASSWORD) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.cookie("access_token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: false,
      });

      return res.status(200).json({ message: "Logged in successfully" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
}

export const logout = (req, res) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: false,
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}