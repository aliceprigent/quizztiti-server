require("dotenv").config(); 
require("./../config/dbConnection");
require("moongose");
const UserModel = require("../models/User")

const user = {
    name: "Pat",
    email: "pat@pat.com",
    password: "pat",
    image: "https://img.icons8.com/color/48/000000/einstein.png",
}

UserModel.create(user)
.then(dbRes => console.log(dbRes))
.catch(dbErr => console.error(dbErr))