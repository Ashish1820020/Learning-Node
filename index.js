const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const db = require(__dirname + "/db.js");

const {addDefault, TodoModel} = db;
const port = 3000;
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", async (req, res) => {
    let value = date();

    let tasks = await TodoModel.find()
        .then((tasks) =>{
            // console.log(tasks);
            return tasks;
        })
        .catch((error)=>{
            return error;
        });
    
    res.render("list", {value, listArray: tasks});
});

app.post("/", async (req, res) =>{
    let newWork = req.body.work;
    
    if(newWork!==""){
        const newTodo = new TodoModel({ task: newWork });
        
        await newTodo.save()
        .then(() =>{
            console.log("Added to the todos Collection of the todolistDb database");
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    res.redirect("/");
});

app.post("/delete", async (req, res) =>{
    let checkboxId = req.body.checkbox;
    if(checkboxId!==undefined){
        TodoModel.findByIdAndRemove(checkboxId)
        .then(() =>{
            console.log("Removed from the todos Collection of the todolistDb database");
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    
    res.redirect("/");
});




app.listen(port, () => {
    console.log("Listning at " + port);
});
