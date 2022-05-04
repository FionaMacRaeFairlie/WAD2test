const nedb = require("nedb");
const express = require("express");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));

const db = new nedb({ filename: "emp.db", autoload: true });
console.log("db created");

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
//DELETE
/*delete_food =function(req,res){
  console.log('deleting food');
  if(!req.body.name){
    res.status(400).send("Insert food name");
    return;
  }
db.deleteEntry(req.body.name);
res.redirect("/");
}*/
exports.delete_food= function (req, res) {
  db.remove({ name: req.body.name }, {}, function (err, docsRem) {
    if (err) {
      console.log("error deleting document");
    } else {
      console.log(docsRem, "document removed from database");
      res.redirect("/");
    }
  })
}
app.post("/delete",delete_food);

app.listen(3000,() =>{
  console.log("Server listening on port: 3000");
});


new_delete_food =function(req,res){
  res.render('deleteFood', {
    'title':'Delete Food'
  })
}
  


