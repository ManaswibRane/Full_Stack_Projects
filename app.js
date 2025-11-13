const express=require("express")
const app=express()
const path=require("path")
const mongoose=require("mongoose")
const engine = require('ejs-mate')
const Listing=require("./models/listing.js");
app.use(express.static(path.join(__dirname, "public")));
const methodOverride=require("method-override")
let MONGO_URL="mongodb://127.0.0.1:27017/wanderLust"
app.engine('ejs', engine);
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"views"))
app.use(methodOverride("_method"))
app.put("/listing/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Listing.findByIdAndUpdate(id,{ ...req.body.list});
        res.redirect("/listing");
    } catch (err) {
        console.log("Validation Error:", err);
        res.send("Update failed");
    }
});

app.listen(8080,()=>{
    console.log("Server is Listning")
})
app.get("/",(req,res)=>{
    res.send("Root");
})

app.post("/listing/new",(req,res)=>{
    console.log("New called")
    res.render("listing/form.ejs");

})
app.post("/listing",async (req, res) => {
    let list = req.body.list;
    let newElement = new Listing(list);
    console.log(list);
    await newElement.save()
    .then(()=>{
        res.redirect("/listing")
    })
});
app.get("/listing/:id",async (req,res)=>{
    let {id}=req.params;
    let list=await Listing.findById(id);
    
    console.log("response sent");
    res.render("listing/show.ejs",{list})
})
app.get("/listing/:id/edit",async (req,res)=>{
      let {id}=req.params;
      let element =await Listing.findById(id);
      res.render("listing/edit.ejs",{element});
})
app.get("/listing",async (req,res)=>{
    let list=await Listing.find({})
    // console.log(list);
    // console.log("response sent");
    res.render("listing/index.ejs",{list})
})

async function main(){
   await mongoose.connect(MONGO_URL)
}
main().then(()=>{
    console.log("Connected")
})
.catch((e)=>{
   console.log(e);
})
app.delete("/listing/:id",async (req,res)=>{
    console.log("Delete route")
       let {id}=req.params

         await Listing.findByIdAndDelete(id);
         res.redirect("/listing")

})