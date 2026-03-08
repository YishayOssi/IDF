import jwt from "jsonwebtoken"

export function auth(req, res, next) {
  try {
    const token = req.headers.authorization
    if (!token) return res.status(401)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    log("***")
    req.agent = { _id: decoded._id, role: decoded.role }
    next()
  } catch (error) {
    return res.status(401).send("Unauthorized")
  }
}

export function adminAuth(req, res, next) {
  if (req.agent.role !== "admin") return res.status(403).send("Forbidden")
  next()
}
