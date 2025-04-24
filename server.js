const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000; 

app.set("view engine", "ejs"); 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true }));

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database('./cv.db');


connection.connect((err) => {
    if (err) {
        console.error("Connection failed: " + err);
        return;
    }
    console.log("connected to MySQL!");
});

  
//Startsida/Visa kurser
app.get("/", (req, res) => {
    const sql = "SELECT * FROM courses ORDER BY created_at DESC";
    db.all(sql, (err, results) => {
        if (err) {
            console.error("Fel vid hämtning av kurser", err);
            return res.render("index", {courses: [], error: "Fel vid hämtning av kurser"});
        } 
            res.render("index", { courses: results, error: null});
        
    });
});

//Lägg till kurs
app.get("/addcourse", (req, res) => {
    res.render("addcourse", {error: [] });
});

app.post("/addcourse", (req, res) => {
    const { courseCode, courseName, courseSyllabus, courseProgression } = req.body;
    let errors = [];
    
    
    
    if (!courseCode) errors.push("Fyll i kurskod");
    if (!courseName) errors.push("Fyll i kursnamn");
    if (!courseSyllabus) errors.push("Fyll i kursplan");
    if (!courseProgression) errors.push("Fyll i kursprogression");
    
    if (errors.length > 0) {
        res.render("addcourse", { error: errors });
    } else {
        const sql = "INSERT INTO courses (coursecode, coursename, syllabus, progression) VALUES (?, ?, ?, ?)";
        db.run(sql, [courseCode, courseName, courseSyllabus, courseProgression], (err) => {
            if (err) {
                console.error("Kunde inte spara kursen i databasen.", err);
                return res.render("addcourse", { error: ["Fel vid sparning till databasen"] });
            } 
                res.redirect("/");
        });
    }

});

//Radera kurs

app.get("/delete/:id", (req, res) => {
    const sql = "DELETE FROM courses WHERE id = ?";
    connection.query(sql, [req.params.id], (err) => {
        if (err) console.error(err);
        res.redirect("/");
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

