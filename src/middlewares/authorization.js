require('dotenv').config()

const userModel = require('../models/user')


const authorization = async(req, res, next) => {

    const userEmail =  req.params.customerEmail
    if (!userEmail) {
        res.status(401).send({
            status: false,
            message: 'Unauthorized Access'
                    
        })
    } else {

        const userData = await userModel.findOne({   email: userEmail })

            if (userData == null) { 
                 res.status(401).send({
                    status: false,
                    message: 'Unauthorized Access'
                            
                 })
                return
            }
        
            req.params.user = userData.user_id
         next()   
    }


}


module.exports = {
    authorization
}