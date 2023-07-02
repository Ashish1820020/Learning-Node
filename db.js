const mongoose = require('mongoose');
const url  = "mongodb://127.0.0.1:27017/todolistDb";
mongoose.connect(url, {useNewUrlParser: true});

const todoSchemaObject = {
    task: String
};

// Creating the schema
const todoSchema = new mongoose.Schema(todoSchemaObject);

// Creating the model from the schema
const TodoModel = mongoose.model('Todo', todoSchema);


const addDefault = () => {
    
    const readTodo = new TodoModel({ task: "Read" });
    const workTodo = new TodoModel({ task: "Work" });
    const sleepTodo = new TodoModel({ task: "Sleep" });
    
    const defaultItems = [readTodo, workTodo, sleepTodo];
    
    TodoModel.insertMany(defaultItems, (error) => {
        if(error){
            console.log(error);
        }
        else{
            console.log("Added to the todos Collection of the todolistDb database");
        }
    });
}

module.exports = {addDefault, TodoModel};