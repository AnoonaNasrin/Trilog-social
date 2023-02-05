import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Autherization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startWith("Beare")) {
      token = token.slice(7, token.length).trmLeft();
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifyToken;
    next();
    
  } catch (er) {
    res.status(500).json({ error: er.message });
  }
};
