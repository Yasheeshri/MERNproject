

//final
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const facultySchema=new Schema(
    {
        userId:{type:String},
    
        password:{type:String},
    
        name:{type:String},
        
        dob:{type:Date},
        
        mobileNumber:{type:String},
        
        email:{type:String},
        
      
        address: {
            city: { type: String },
            state: { type: String },
            pincode: { type: Number }
          },
          gender:{type:String},
          
          facultyDocumentFilePath: {
            type: String,
            
          },
          facultyPhotoFilePath: {
            type: String,
            
          },
          facultystatus: { type: String, default: 'Active' },
          createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date },

        
    },
    {
        collection:'faculty'
    }
);



// Pre-save middleware to set the updatedOn field
facultySchema.pre("save", function (next) {
  this.updatedOn = new Date();
  next();
});

module.exports=mongoose.model('faculty',facultySchema);