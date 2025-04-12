const mongoose=require("mongoose")
const initdata=require("./sampleData.js")
let MONGO_URL="mongodb://127.0.0.1:27017/wanderLust"
const Listing=require("../models/listing.js");
// app.listen(8080,()=>{
//     console.log("Server is Listning")
// })
// app.get("/",(req,res)=>{
//     res.send("Root");
// })

async function main(){
   await mongoose.connect(MONGO_URL)
}
main().then(()=>{
    console.log("Connected")
})
.catch((e)=>{
   console.log(e);
})
const initDataBase=async () => {
     await Listing.deleteMany({});
     await Listing.insertMany(initdata.data);
     console.log("Data saved")
           }
initDataBase();