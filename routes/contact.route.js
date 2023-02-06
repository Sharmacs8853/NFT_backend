const { Router } = require('express');
const { contactModel } = require('../model/contact.model');
const contactController = Router();
const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user:  "sharmacs8853@gmail.com",
        pass:   "jitendra@123",
    }
 });

//==========Post API for contact=============== 
contactController.post("/post", async (req, res) => {
    const { name, email, phone, subject, msg } = req.body;
    const new_contact = new contactModel({
        name,
        email,
        phone,
        subject,
        msg
    });

    await new_contact.save();
    sendMail(email, name)
    res.send({ "msg": "thank you for contact" })
})

//==========get API for contact===============
contactController.get('/get', async (req, res)=>{
    //console.log(req.query);
    const query = req.query;
    const contact = await contactModel.find(query)
    res.send(contact)
})

contactController.delete('/:id', async (req, res)=>{
   const id = req.params.id;
   console.log(id);
   try {
    await contactModel.deleteOne({_id:id})
    res.send({"msg":"contact deleted successfully"})
   } catch (error) {
    console.log(error);
   }
})

const sendMail  = (email, name)=>{
    transport.sendMail({
       to:  email,
       from: "apnetv@apnetv.com",
       subject: "Welcome",
       text: `Hello ${name},
               
               Welcome !!!
               You Succesfully register 
               thank from jitendra sharma
                
       
       `
   }).catch((e)=>{
    console.log(e.message, "error")
   })   
 }

module.exports = {
    contactController
}