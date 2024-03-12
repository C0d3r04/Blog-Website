var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);

var db = new sqlite3.Database('./database/blogs.db');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));

db.run('CREATE TABLE IF NOT EXISTS blogs(BlogName, BlogData)');

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

//Create
app.post('/add', function(req,res){
    db.serialize(()=>{
      db.run('INSERT INTO blogs(BlogName, BlogData) VALUES(?,?)', [req.body.name, req.body.content], function(err) {
        if (err) {
          return console.log(err.message);
        }
        console.log("New Blog has been created");
        
        res.send(`
          <h1>New Blog has been created</h1>
          `);
      });
  });
  });

  //Read
  app.post('/view', function(req,res){
    db.serialize(()=>{
      db.each('SELECT BlogName, BlogData FROM blogs WHERE BlogName =?', [req.body.name], function(err,row){     //db.each() is only one which is funtioning while reading data from the DB
        if(err){
          res.send("Error encountered while displaying");
          return console.error(err.message);
        }
        res.send(` <storng>Name:</strong> ${row.BlogName},</br><storng>Data:</storng> ${row.BlogData}`);
        console.log("Blog displayed successfully");
      });
    });
  });

  //Update
  app.post('/update', function(req,res){
    db.serialize(()=>{
      db.run('UPDATE blogs SET BlogName = ?,BlogData = ? WHERE BlogName = ?', [req.body.newname,req.body.content ,req.body.name], function(err){
        if(err){
          res.send("Error encountered while updating");
          return console.error(err.message);
        }
        res.send(`
          <h1>Blog Updated Successfully</h1>
          `);
        console.log("Blog updated successfully");
      });
    });
  });

  //Delete
  app.post('/delete', function(req,res){
    db.serialize(()=>{
      db.run('DELETE FROM blogs WHERE BlogName = ?', req.body.name, function(err) {
        if (err) {
          res.send("Error encountered while deleting");
          return console.error(err.message);
        }
        res.send(`
          <h1>Blog Deleted Successfully</h1>
          `);
        console.log("Blog deleted");
      });
    });
  });

  app.get('/entries', function(req, res) {
    db.all('SELECT * FROM blogs', (err, rows) => {
        if (err) {
            console.error('Error fetching entries from database:', err);
            return res.status(500).json({ error: 'Error fetching entries from database' });
        }
        console.log('Fetched entries:', rows); 
        res.json(rows); 
    });
});

  server.listen(3000,function(){ 
    console.log("Server listening on port: 3000");
  });