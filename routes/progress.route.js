const { Router } = require('express');
const { progressModel } = require('../model/progress.model');
const progressController = Router();

//==========Post API for contact=============== 
progressController.post("/post", async (req, res) => {
    const { active_user, artwork, artist } = req.body;
    const new_progress = new progressModel({
        active_user,
        artwork,
        artist
    });

    await new_progress.save();
    res.send({ "msg": "progress added" })
})

//==========get API for contact===============
progressController.get('/get', async (req, res) => {
    //console.log(req.query);
    const query = req.query;
    const progress = await progressModel.find(query)
    res.send(progress)

})

progressController.delete('/:id', async (req, res)=>{
    const id = req.params.id;
    console.log(id);
    try {
     await progressModel.deleteOne({_id:id})
     res.send({"msg":"contact deleted successfully"})
    } catch (error) {
     console.log(error);
    }
 })

module.exports = {
    progressController
}