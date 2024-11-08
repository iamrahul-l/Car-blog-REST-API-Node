import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT||4000;


let posts = [
  {
    id: 1,
    title: "The Evolution of High-Performance Engines",
    content:
      "Over the years, car engines have evolved from simple mechanical structures to advanced powerhouses capable of jaw-dropping performance. This article explores the advancements in engine technology, including turbocharging, supercharging, and hybrid integration. With every new model, manufacturers push the boundaries of speed, power, and efficiency.",
    author: "Dominic Toretto",
    date: "2024-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Future of Electric Cars in Street Racing",
    content:
      "Electric cars are taking the automotive world by storm, but can they find a place in street racing? This post examines the impact of electric technology on car performance, the potential for instant torque, and whether the electric revolution could redefine speed as we know it. With major manufacturers entering the scene, the future of street racing could look very different.",
    author: "Brian O'Conner",
    date: "2024-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Top Mods for Maximum Drift Control",
    content:
      "Mastering drift is an art, and having the right car setup is crucial. In this guide, we’ll go over the best modifications to maximize drift control, from suspension upgrades to differential tuning. Learn how to transform a standard car into a drift-ready machine capable of smooth, controlled slides around tight corners.",
    author: "Letty Ortiz",
    date: "2024-08-10T09:15:00Z",
  },
];




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/posts",(req,res)=>{
  const allblogs = posts;
  res.json(allblogs);

});


app.get("/posts/:id",(req,res)=>{
  const postid = parseInt(req.params.id);
  const postbyid = posts.find((post)=>post.id === postid);
  res.json(postbyid);

});



app.post("/posts",(req,res)=>{
  const newpostid = (posts.length+1);
  const newpost = {
    id: newpostid,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date:new Date(),
  };
  posts.push(newpost);
  console.log(newpostid);
  res.status(201).json(newpost);


});

app.patch("/posts/:id",(req,res)=>{
  const postid = parseInt(req.params.id);
  const updateposy = posts.find((post) => post.id === postid);
  console.log(updateposy);
  if(!updateposy) return res.status(404).json({message:"Invalid post id"})

    if(req.body.title) updateposy.title = req.body.title;
    if(req.body.title) updateposy.content = req.body.content;
    if(req.body.author) updateposy.title = req.body.author;
    res.json(updateposy);
});


app.delete("/posts/:id",(req,res)=>{
  const delid = parseInt(req.params.id);
  const indexs = posts.findIndex((post)=> post.id ===delid);
  if (indexs === -1) return res.status(404).json({ message: "Post not available" });
  posts.splice(indexs,1);
  console.log("Posts"+ indexs);
  res.json({message:"Post deleted"});


});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
