const express = require('express');
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.listen(3000,()=>{
    console.log("Server listening on port: 3000");
    });
