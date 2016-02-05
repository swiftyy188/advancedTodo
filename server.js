//Include the rethinkdbdash object
//You can read more about rethinkdbdash at: https://github.com/neumino/rethinkdbdash
var r = require("rethinkdbdash")();

//Setup your RethinkDB database with the rethink-config package
//You can read more about rethink-config at: https://github.com/PilotInteractive/rethink-config
require("rethink-config")({
  //Must ALWAYS pass the rethinkdbdash object.
  "r": r,
  //The database name
  "database": "advancedTodo",
  //The tables in an array
  "tables": ["todos"]
})

//Initialize express object
var express = require("express");
//Create an instance of express
var app = express();
//Serve static content in /public
//You chain it to the express middleware object using the `.use()` function
app.use(express.static("./public"));

//Create your first POST request, that recieves a new todo item.
app.post("/todo", function(req,res,next) {
  //A ReQL query that selects the db with .db() and table with .table() then inserts with .insert()
  r.db("advancedTodo").table("todos").insert({
    "todo": req.body.todo,
    "complete": false,
    "date": new Date()
  }).then(function() {
    //Let the client know that we created the todo.
    return res.send("Todo created!")
  })
})

//Create your first GET request, that sends all the todo items to the client.
app.get("/todo", function(req,res,next) {
  //Simply selecting the .db() and .table() selects all items in the todo list
  r.db("advancedTodo").table("todos").then(function(result) {
    //Send the array back to the client.
    return res.send(result);
  })
})

//Listen and serve the app on the desired PORT
var PORT = 3000;
app.listen(PORT);
console.log("App running on port " + PORT);
