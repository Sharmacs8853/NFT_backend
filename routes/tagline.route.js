const { Router } = require("express");
const { taglineModel } = require("../model/tagline.model");
const taglineController = Router()

taglineController.post("/post", async (req, res) => {
    const { tagline } = req.body;
    const new_tagline = new taglineModel({
        tagline
    })
    await new_tagline.save()
    res.send({ "msg": "tagline added" })
})

taglineController.get("/get", async (req, res) => {
    const query = req.query;
    const tagline = await taglineModel.find(query)
    res.send(tagline)
})

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

module.exports = {
    taglineController
}