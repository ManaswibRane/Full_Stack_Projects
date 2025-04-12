const mongoose=require("mongoose")
const schema=mongoose.Schema()
const Listing_Schema=mongoose.Schema({
    title:{ 
       
       type: String,
        required:true,
    } ,
    description:{
        
       type: String,
        required : true,
    } ,
    image : { 
      
       type: String,
        default:"https://images.unsplash.com/photo-1734630630491-458df4f38213?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set:(v)=> v ==""?"https://images.unsplash.com/photo-1734630630491-458df4f38213?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
    } ,
    price: { 
       type: Number,
        required:true,
    } ,
    location: { 
       type: String,
        required:true,
    } ,
    country:{ 
       type: String,
        required:true,
    } ,
});
const Listing=mongoose.model("Listing",Listing_Schema);
module.exports=Listing;