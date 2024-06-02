const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    title:{
        type:String,
        min:5,
        max:15,
        required:true
    },
    description:{
        type:String,
        min:30,
        max:200,
        required:true
    },
    postedBy:{
        type:String,
        min:5,
        max:30,
        required:true
    }
},
{timestamps:true}
);

module.exports = mongoose.model("notes",notesSchema);