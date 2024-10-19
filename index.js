const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
    fs.readdir(`./files`, function(err, files){
        res.render("index", {files: files})
    })
    
});

app.get("/file/:fileName", function(req, res){
    fs.readFile(`./files/${req.params.fileName}`, "utf-8", function(err, fileData){
        // console.log(fileData);
        res.render("show", {fileName: req.params.fileName, fileData: fileData})
        
    })
});

app.post("/create", function(req, res){
    const fileTitle = req.body.title;
    const newTitle = fileTitle.split(" ");

    for (let i = 0; i < newTitle.length; i++) {
        if (newTitle[i]) { // Ensure the word is not an empty string
            newTitle[i] = newTitle[i][0].toUpperCase() + newTitle[i].substr(1);
        }
    }

    const newTitle2 = newTitle.join("");

    fs.writeFile(`./files/${newTitle2}.txt`, req.body.details, function(err){
        res.redirect("/");
    })
    
});

app.post("/delete/:fileName", function(req, res){
    fs.unlink(`./files/${req.params.fileName}`, function(err){        
        res.redirect("/");
    })
    
});

app.listen(3000, function(){
    console.log("App is running...")
})