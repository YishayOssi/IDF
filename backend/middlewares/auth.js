import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send("No token provided!");
    }
    const token = authHeader.split(" ")[1] || authHeader;
    // 3. אימות הטוקן
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.agent = {id: decoded.id, role: decoded.role};
    next(); 
  } catch (error) {
    return res.status(401).send("Invalid or expired token!");
  }
}

export function adminAuth(req, res, next) {
  if (req.agent.role !== "admin") return res.status(403).send("Administrator permission required!!")
  next()
}
