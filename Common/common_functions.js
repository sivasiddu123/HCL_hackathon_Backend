const jwt = require('jsonwebtoken');

const verifyJWT=async (req, res, next)=>{
    try {
		let tokenHeader = req.headers['authorization'];
		if (tokenHeader) {
			let token = await tokenHeader.split(" ");
			  let decoded = jwt.verify(token[1],"test",{algorithms:"RS256"});
			if (decoded) {
				if(isTokenInvalid != null && isTokenInvalid == true){
					return res.status(401).json({ success: false, error: 'Unauthorized Token. User Token is not valid.' });
				}

				if(user == undefined || user ==  null){
					return res.status(401).json({ success: false, error: 'Unauthorized Access.' })
				}
				let currentTime = (new Date().getTime())/1000;
				if(decoded.exp < currentTime)
					return res.status(401).json({ success: false, error: 'Token Validity Expired.' });
				else    
					return next();
			}else{
				return res.status(401).json({ success: false, error: 'Unauthorized Token. User Token required.' });
			}      
		}else{
			return res.status(401).json({ success: false, error: "Unauthorized Token. User Token required." })
		}
	} catch (error) {
		return res.status(401).json({ success: false, error: 'JWT Token is expired.' })
	}
}

// Helper to generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

module.exports={verifyJWT, generateToken}