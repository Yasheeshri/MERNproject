const mongoose=require("mongoose");
const Schema=mongoose.Schema;

let branch=new Schema(
    {
        bcode:{type:Number},
        bname:{type:String},
        bstatus:{type:String},
        bcreatedon:{type:Date},
        bupdatedon:{type:Date}
    },
    {
        collection:"branch"
    }
);

module.exports=mongoose.model("branch",branch); 