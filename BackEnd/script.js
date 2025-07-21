const express=require("express")
const fs=require("fs");
const app=express();
const PORT=3000;
const cors = require('cors');

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const FILE="data.json";

let id=0;

app.use(express.json());
app.use(cors());

function readdata(){
    let data=fs.readFileSync(FILE,'utf-8');
    return JSON.parse(data);
}

function savedata(data){
    fs.writeFileSync(FILE,JSON.stringify(data,null,2));
}

app.get("/tasks",(req,res)=>{
    const data=readdata();
    res.json(data);
})

app.post("/tasks",(req,res)=>{
    const data=readdata();
    const newtask={
        "id":id,
        "task":req.body.task,
        "done":false
    }
    id=parseInt(id);
    id++;
    id=id.toString();
    data.push(newtask);
    savedata(data);
    res.status(201).json(newtask);
})

app.delete("/tasks/:id",(req,res)=>{
    let data=readdata();
    const id=req.params.id;
    console.log(data,id);
    const index=data.findIndex(item => item.id== id);
    console.log(index);
    if (index === -1) return res.status(404).json({ error: "Task not found" });

    data.splice(index, 1);
    savedata(data);

    res.json({message:"Task Completed"})
})

app.put("/tasks/:id",(req,res)=>{
    const data=readdata();
    const id=req.params.id;
    const index = data.findIndex(item=>item.id=== id);
    if(index===-1){
        return res.status(404).json({error:"Task not found"});
    }
    data[index].done=true;

    savedata(data);
    res.json(data[index]);
})


app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})
