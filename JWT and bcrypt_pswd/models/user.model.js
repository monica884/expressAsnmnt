const {mongoose,SchemaTypes, Types}=require("mongoose")

const userSchema = new mongoose.Schema({
    Email:{
        type:SchemaTypes.String,
        required:true
    },
    Password:{
        type:SchemaTypes.String,
        required:true
    },
    Name:{
        type:SchemaTypes.String,
        required :true
    },
    Contacts:{
        type:SchemaTypes.String,
        required:true
    },
})

const User = mongoose.model('User',userSchema)

module.exports=User