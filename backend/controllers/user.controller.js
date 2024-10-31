const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require("crypto");

const { sendVerificationMail } = require("../utils/sendVerificationMail");

exports.signup = async (req, res) => {
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // If email doesn't exist, proceed with registration
      const data = {
        typeofuser: req.body.typeofuser,
        firstname: req.body.firstname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password , 10),
        address: req.body.address,
        cpassword: req.body.cpassword,
        phone: req.body.phone,
        emailToken:crypto.randomBytes(64).toString("hex"), 
      };
  
      const _user = new User(data);
      
      
      await _user.save();

      sendVerificationMail(_user);

      res.status(200).json({ message: "User registered successfully" });
    } catch (err) {
      console.error("Error registering user", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

exports.login = async (req, res ) => {
    const {email, password} = req.body;
    const user = await User.findOne ({ email: email})

    if (!user){
        return res.status(400).json({ message : "email invalid"})
    }

    bcrypt.compare( password, user.password).then(
        (isMatch) => {
            if(isMatch == false){ //false dito
                return res.status(400).json({ message : "wrong pass"})
            }else{ //tru dito

                //mag generate token dito
                const token = jwt.sign(
                        {data: {id: user._id , role : user.role}} ,
                        process.env.CLE,
                        { expiresIn : '1h'}

                    )

                    return res.status(200).json(
                        {
                            message : "Success..",
                            token : token,
                            user : user
                        })


            }
        }
    )

}


exports.updateProfile = (req, res) => {

    const {_id, typeofuser, firstname, email, password, address, cpassword, phone} = req.body;
    console.log('Received request to update profile:', req.body);
    const updatedData = {
        typeofuser,
        firstname,
        email, 
        password, 
        address, 
        cpassword, 
        phone,
    };

    console.log('Updating with data:', updatedData);
    if (req.file) {
        // If a file was uploaded
        updatedData.image = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
    
        // Add a property indicating that the image was uploaded
        updatedData.imageUploaded = true;
      }
    
    
      User.findByIdAndUpdate(_id, updatedData, { new: true, useFindAndModify: false })
      .then(user => {
          console.log('Updated user document:', user);
          return res.status(200).json({ message: "Profile updated successfully", user });
      })
      .catch(err => {
          console.error('Error updating profile:', err);
          return res.status(500).json({ message: err });
      });


exports.verifyEmail = async (req, res) => { 
  try {
      const emailToken = req.body.emailToken;

      if (!emailToken) return res.status(404).json("EmailToken not found...");

      const user = await userModel.findOne({ emailToken });

      if (user) {
        user.emailToken = null; 
        user.isVerified = true;

        await user.save();

        const token = createToken(user._id);

        res.status(200).json({
          _id: user._id,
          name: user.firstnamename,
          email: user.email,
          token,
          isVerified: user?.isVerified,
        });
      
      } else res.status(404).json("Email verification failed, invalid token!");
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
  }
};
}




  
