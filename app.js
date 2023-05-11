var express=require('express');
const ServerSelectionError = require('mongodb').ServerSelectionError;
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const app=express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true} ,)
.then (() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({ name: "GEHAD" });
const item2 = new Item({ name: "AHMED" });
const item3 = new Item({ name: "IBRAHIM" });

const defaultItems = [item1, item2, item3];
app.get("/", function (req, res) {
Item.find({}, function(err, foundItems){
    res.render("list", { list: "Today",newListItem: foundItems });
});
});

app.post("/", function (req, res) {
  i = req.body.n;
  const item = new Item({ name: i });
  console .log(item);
  item.save();
  res.redirect("/");
});

app.post("/delete", function(req, res){
Item.findByIdAndRemove(req.body.checkbox, function(err){
  if(!err){
    console.log("Successfully deleted checked item.");
    res.redirect("/");
  }
});
});



app.listen(3000, function(){
    console.log('Server is running on port 3000');
});
