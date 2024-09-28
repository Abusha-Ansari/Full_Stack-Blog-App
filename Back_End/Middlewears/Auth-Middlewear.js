const JWT = require('jsonwebtoken');
const Users = require('../Schema/registerSchema')

// const authMiddlewear = async (req,res,next) => {
//     const data = req.body;
//     const token = data.token;

//     // const token = localStorage.getItem('token');

//     if (!token) {
//         return res.status(401).send('Access Denied');
//     }

//     try {
//         const isVerified = JWT.verify(token,'blogdatatoken')
//         const userData = await Users.findOne({email:isVerified.email}).select({password:0});
//         if (!userData) {
//             return res.status(404).send('User not found');
//         }
//         req.user = userData
//         next();
//     } catch (error) {
//         res.status(400).send('Invalid Token')
//     }
// }

// module.exports = authMiddlewear;

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
  
    if (!token) {
      return res.status(401).send('Access Denied');
    }
  
    try {
      const isVerified = JWT.verify(token, 'blogdatatoken');
      const userData = await Users.findOne({ email: isVerified.email }).select({ password: 0 });
      if (!userData) {
        return res.status(404).send('User not found');
      }
      req.user = userData;
      next();
    } catch (error) {
      console.log('JWT verification failed:', error);
      return res.status(400).send('Invalid Token');
    }
  };
    module.exports = authMiddleware;