import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js'
import User from '../schemas/user.schema.js'


const authorize = async (req, res, next) => {
  try {
    let token;
    // Check if the token is in the headers
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if(!token) return res.status(401).json({ message: 'Unauthorized' });
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if(!user) return res.status(401).json({ message: 'Unauthorized' });

    req.user = user;

    next(); // Call the next middleware or controller
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
}

export default authorize;