const express= require("express");
const mongoose= require("mongoose");
const app = express();
const port= 5000;
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json())
//db connection
mongoose.connect('mongodb://localhost:27017/merncurd').then(()=>{
console.log("bd connection successfully");
}).catch((error)=>{
    console.log(error)
})
//user schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true
    }
    
},{timestamps:true})

const User= mongoose.model('User',userSchema);//collection create kore debe
//createuser
app.post("/createuser",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user= new User({name,email,password});
        const userData= await user.save();
        res.send(userData);
    }
    catch(error){
        res.send(error);
    }
})
//read all user

app.get('/readalluser',async (req,res)=>{
    try{
        const userData= await User.find({}) ;
        res.send(userData);
    }
    catch(error){
        res.send(error);
    }
})
//read particular user
app.get('/read/:id',async (req,res)=>{
    try {
        const id= req.params.id;
        const user = await User.findById({_id:id});//duto id check korchi
        res.send(user);
    } catch (error) {
        res.semd(error);
    }
})
app.get('/',(req,res)=>{
res.send("from get router");
})
app.put("/updateuser/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const user =await User.findByIdAndUpdate({_id:id},req.body,{new:true});
        res.send(user);
    } catch (error) {
        res.send(error);
    }
})
app.delete("/delete/:id",async (req,res)=>{
    try {
        const id= req.params.id;
        const user= await User.findByIdAndDelete({_id:id});
        res.send(user);
    } catch (error) {
        res.send(error);
    }
})
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})