const router = require("express").Router();
const notesSchema = require('../models/Notes');
const userSchema = require('../models/User');

//create notes

router.post('/createNotes',async(req,res)=>{
    try{
        const notes = new notesSchema({
            title:req.body.title,
            description:req.body.description,
            postedBy:req.body.postedBy
        });

        const data = await notes.save();

        res.status(200).json(data);

    }catch(error){
            res.status(400).json(error);
    }
});

//delete notes
router.delete('/deleteNotes/:id',async(req,res)=>{
    try{


        
        let findNotes = await notesSchema.findOne({_id:req.params.id});
        
        if(!findNotes) res.status(400).json({"message":"notes doesn't exist"});
        
        if(findNotes){
            const deletedNode = await notesSchema.deleteOne({_id:req.params.id});
            res.status(200).json({"message":"note deleted successfully",status:true})
        }


    }catch(error){
        res.status(500).json(error);
    }

});

//update notes
router.put('/updateNotes/:id',async(req,res)=>{

    try{        

        let findNotes = await notesSchema.findOne({_id:req.params.id});
        
        if(!findNotes) res.status(400).json({"message":"notes doesn't exist"});
        
        if(findNotes){
           const updatedNotes = await notesSchema.findOneAndUpdate({_id:req.params.id},{
            title:req.body.title,
            description:req.body.description,
            postedBy:req.body.postedBy
           });
           res.status(200).json({"message":"notes updated successfully",data:updatedNotes})
        }


    }catch(error){
        res.status(500).json(error);
    }

});

//getAllNotes
router.get('/getNotes/:currentUser',async(req,res)=>{

    try{
        const currentUser = await userSchema.findById(req.params.currentUser);
        // console.log(currentUser)
        if(!currentUser){
            // console.log('inside error ------')
            res.status(400).json({"message":"user not found",status:false})
        }
        if(currentUser){
            const notes = await notesSchema.find({postedBy:req.params.currentUser});
            res.status(200).json(notes);
        }
    }catch(error){
        res.status(500).json(error)
    }
    
});


module.exports = router;