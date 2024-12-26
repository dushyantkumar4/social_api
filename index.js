const express=require("express");
const app=express();
const path=require("path");
const users=require("./MOCK_DATA (1).json");
const methodOverride=require("method-override");

const port=8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.get("/app/:username",(req,res)=>{
    let {username}=req.params;
    const user=users.find((user)=>username===user.username);
    res.render("index.ejs",{user}); 
});

app.post("/app",(req,res)=>{
    let {username,posts,followers,following,about}=req.body;
    users.push({username,posts,followers,following,about});
    let url=`http://localhost:8080/app/${username}`;
    res.redirect(url);
});

app.post("/app/change",(req,res)=>{
    let {username}=req.body;
    console.log(username);
    res.send("app is working");
});

app.get("/app/change",(req,res)=>{
    res.render("change.ejs");
});

app.patch("/app/:username",(req,res)=>{
    let{username}=req.params;
    let newAbout=req.body.about;
    const user=users.find((user)=>username===user.username);
    user.about=newAbout;
    let url=`http://localhost:8080/app/${username}`;
    res.redirect(url);
});

app.get("/app/:username/edit",(req,res)=>{
    let {username}=req.params;
    let user=users.find((user)=>username===user.username);
    res.render("edit",{user});
});

app.get("/app",(req,res)=>{
    res.render("new.ejs");
});

app.listen(port,()=>{
    console.log(`server is listening on ${port}`);
});