const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000; 

app.set("view engine", "ejs"); 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true }));

app.get('/', (req, res) => {
    res.render('index', { error: null }); // eller ett faktiskt felmeddelande
  });
  

//Anslutning
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: ""
});

connection.connect((err) => {
    if (err) {
        console.error("connection failed: " + err);
        return;
    }
    console.log("connected to MySQL!");
});

//Startsida/Visa kurser
app.get("/", (req, res) => {
    res.render("index");
});

//Lägg till kurs
app.get("/addcourse", (req, res) => {
    res.render("addcourse", {
        error: []
    });
});

app.post("/addcourse", (req, res) => {
    let newCourseCode = req.body.courseCode;
    let newCourseName = req.body.courseName;
    let newCourseSyllabus = req.body.courseSyllabus;
    let newCourseProgression = req.body.courseProgression;
    let error = null;
    
    if(newCourseCode === "") {
        error.push("Fyll i kurskod")
    }
    if(newCourseName === "") {
        error.push("Fyll i kursnamn")
    }
    if(newCourseSyllabus === "") {
        error.push("Fyll i kursplan")
    }
    if(newCourseProgression === "") {
        error.push("Fyll i kursprogression")
    }

    res.render("addcourse", {
        error: error
    });

});

//About
app.get("/about", (req, res) => {
    res.render("about");
});

//Starta 

app.listen(port, () => {
    console.log("Server started on port: " + port);
});

