const { Router } = require('express');
const adminController = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { adminModel } = require('../model/admin.model');


//==================signup API for admin================
adminController.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const existing_admin = await adminModel.findOne({ email });
    if (existing_admin) {
        res.send({ msg: "admin already exist" });
        return;
    }
    bcrypt.hash(password, 4, async function (err, hash) {
        if (err) {
            res.send({ msg: "signup failed... try again.." })
        } else {
            const new_admin = new adminModel({
                name,
                email,
                password: hash,
            })
            await new_admin.save();
            res.send({ msg: "signup successfull" });
        }
    });
});

// ============login api for admin ================== 
adminController.post("/login", async (req, res) => {
    const { email, password } = req.body
    const admin = await adminModel.findOne({ email })

    if (admin) {
        const hashed_password = admin.password;
        const admin_id = admin._id;
        bcrypt.compare(password, hashed_password, function (err, result) {
            if (err) {
                res.send({ msg: "Something went wrong, try again later" })
            } if (result) {
                const token = jwt.sign({ admin_id }, process.env.SECRET);
                res.send({ msg: "Login successfull", token,email})
            } else {
                res.send({ "msg": "Login failed" })
            }
        });
    } else {
        res.send({ msg: "envalid cradentials" })
    }
})
// ============get API for admins===========
adminController.get("/users", async (req, res) => {
    const query = req.query;
    const users = await adminModel.find(query)
    res.send(users)
})

//========delete route for users or admins ========
adminController.delete('/:id', async (req, res)=>{
    const id = req.params.id;
    console.log(id);
    try {
     await adminModel.deleteOne({_id:id})
     res.send({"msg":"contact deleted successfully"})
    } catch (error) {
     console.log(error);
    }
 })

// =========update route for admin ===========
adminController.patch("/:id", async (req, res)=>{
    const id = req.params.id;
  //  console.log(id);
    try {
        const updatedAdmin = await adminModel.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(200).send(updatedAdmin);
    } catch (error) {
        res.status(404).send({"msg":"admin can't be updated something went wrong"})
    }
})

// ===========get admin by id ============

adminController.get("/:id", async (req, res)=>{
    const id = req.params.id;
    console.log('id', id);
    try {
        const admin = await adminModel.find({_id: id})
        res.status(200).send(admin);
    } catch (error) {
        res.status(404).send({"msg":"not getting the data by id"})
    }

})
module.exports = {
    adminController
}
