const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const dbPath = path.join(__dirname, "..", "db", "db.json"); 


//req.body object allows you to access data in a string or JSON object from the client side and add it to the `db.json` file, 
//then return a new note to the client.
router.post("/api/notes", (req, res) => {
    let createNewNote = req.body;
    let noteList = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    let notelength = (noteList.length).toString();

    //create new property called id based on length and assign it to each json object
    createNewNote.id = notelength;
    //push updated note to the data containing notes history in db.json
    noteList.push(createNewNote);

    //write the updated data to db.json
    fs.writeFileSync(dbPath, JSON.stringify(noteList));
    res.json(noteList);
})

//delete note according to their tagged id.
router.delete("/api/notes/:id", (req, res) => {
    let noteList = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    let noteId = (req.params.id).toString();

    //filter all notes that does not have matching id and saved them as a new array
    //the matching array will be deleted
    noteList = noteList.filter(selected =>{
        return selected.id != noteId;
    })

    //write the updated data to db.json and display the updated note
    fs.writeFileSync(dbPath, "utf-8", JSON.stringify(noteList));
    res.json(noteList);
});


module.exports = router;