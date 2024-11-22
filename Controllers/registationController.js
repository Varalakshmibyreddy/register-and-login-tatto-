const registrtion = require('../models/registrationmodel')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')


// Register controller
const registrations = async (req, res) => {
  const { username , email, phonenumber , password , confirmPassword } =  req.body
//   console.log(username,email,phonenumber,password,confirmPassword)
  try {
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user already exists
    const existingUser = await registrtion.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'username or email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new registrtion({
        username,
        email,
      phonenumber,
      password: hashedPassword,
      confirmPassword: hashedPassword
    });
  console.log(newUser)
  
    // Save the user to the database
    await newUser.save();

    // if(newUser){
    //     const profile = new 
    // }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

//  login controller
const registrtionLogin = async(req, res) => {
    const { email, password } = req.body;
    console.log( email, password )
    try {
        const registrtions = await registrtion.findOne({ email });
        if (!registrtions || !(await bcrypt.compare(password, registrtions.password))) {
            return res.status(401).json({ error: "Invalid username or password" })
        }
        const token = jwt.sign({ vendorId: registrtions._id }, "jwytfaatererhd", { expiresIn: "90days" })

        const vendorId = registrtions._id;
        console.log(registrtions)

        res.status(200).json({ success: "Login successful", token, vendorId })
        console.log(email, "this is token", token);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }

}
module.exports = {registrations,registrtionLogin}