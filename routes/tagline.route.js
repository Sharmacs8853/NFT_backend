const { Router } = require("express");
const { taglineModel } = require("../model/tagline.model");
const taglineController = Router()
//======= post request for tagline ===============
taglineController.post("/post", async (req, res) => {
    const { tagline } = req.body;
    const new_tagline = new taglineModel({
        tagline
    })
    await new_tagline.save()
    res.send({ "msg": "tagline added" })
})

//======= get request for tagline ===============
taglineController.get("/get", async (req, res) => {
    const query = req.query;
    const tagline = await taglineModel.find(query)
    res.send(tagline)
})

//======= delete request for tagline ===============
taglineController.delete('/:id', async (req, res)=>{
    const id = req.params.id;
    console.log(id);
    try {
     await taglineModel.deleteOne({_id:id})
     res.send({"msg":"contact deleted successfully"})
    } catch (error) {
     console.log(error);
    }
 })

//======= update request for tagline ===============
taglineController.patch("/:id", async (req, res)=>{
    const id = req.params.id;
    console.log(id);
    try {
        const updatedTagline = await taglineModel.findByIdAndUpdate(id, req.body, {
            new: true
        })
    res.status(200).send(updatedTagline);
    } catch (error) {
    res.status(400).send({"msg":"taglinen updation failed"})
    }
})

// ===========get tagline by id ============
taglineController.get("/:id", async (req, res)=>{
    const id = req.params.id;
    console.log("id for taglien", id);
    try {
        const tagline = await taglineModel.find({_id: id})
        res.status(200).send(tagline)
    } catch (error) {
        res.status(404).send({msg:"tagline not found by id! something wend wrong"})
    }
})

module.exports = {
    taglineController
}