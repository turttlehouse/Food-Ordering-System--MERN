const User = require("./model/userModel");
const bcrypt = require("bcryptjs");

const adminSeeder =async()=>{

        const isAdminExists = await User.findOne({userEmail:"admin@gmail.com"})

        if(!isAdminExists)
            {
                await User.create({
                    userEmail:"admin@gmail.com", 
                    userPassword :bcrypt.hashSync("admin",10),
                    userPhoneNumber:"9882020908",
                    userName : "admin",
                    role : "admin"

                })

                console.log("admin seeded successfully");

            }

            else 
            {
                console.log("admin already seeded");
            }


}

module.exports = adminSeeder


