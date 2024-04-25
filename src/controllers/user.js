
const Users =require('../models/user')
const jwt = require("jsonwebtoken");

const {hashPassword,comparePassword} =require("../utils/helpers")
const { validateCreateAccount } = require("../validations/user");


const createUser = async(req,res,) =>{

  const { error } = validateCreateAccount(req.body);
  if (error !== undefined) throw new Error(error.details[0].message)

 const{surname, othernames, email, phone_number, password} = req.body

 try {
    const user = await Users.findOne({email:email, });
    if (user.length > 0)throw new Error ("User already exists")

    const { hash, salt } = await hashPassword(password);

    const newUser = {
        surname: surname,
        othernames: othernames,
        email: email,
        phone_number: phone_number,
        password_hash: hash,
        password_salt: salt,
    }

    await create("Users", newUser);
    //otp
    const otp = Math.floor(100000 + Math.random() * 900000);
    redisClient.set(`${newUser.email}`, JSON.stringify(otp), {
        EX: 60 * 3, //seconds
        NX: true,
      });
    res.status(201).json({
        status: true,
        message: "User successfully created",
       
      });
 } catch (error) {
    res.status(400).json({
      status: false,
      message: "Internal server error"
    })
 }
}

const login = async(req, res) =>{
  const { email, password } = req.body;
  try {
    if (!email || !password) throw new Error("All fields are required");
    const checkIfUserExists = await Users.findOne({email:email, })
    if (checkIfUserExists == null) throw new Error("Invalid email or password");
    
    const dataToaddInMyPayload = {
      email: checkIfUserExists.email,
     
    };

    const compareHash = await comparePassword(
      password,
      checkIfUserExists.password_hash
    );
    if (!compareHash) throw new Error("Invalid email or password");

    const token = jwt.sign(dataToaddInMyPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      status: true,
      message: "User login successful",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }

}


module.exports = {createUser, login}