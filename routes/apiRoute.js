const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require('uuid');

const router = express.Router();

const dbPath = path.join(__dirname, "..", "db", "db.json"); 


//route to read the `db.json` file and return all saved notes as JSON.
router.get("/api/notes", (req, res) => {
    let getNotes = JSON.parse(fs.readFileSync(dbPath));
    res.json(getNotes);
   
});


//req.body object allows you to access data in a string or JSON object from the client side and add it to the `db.json` file, 
//then return a new note to the client.
router.post("/api/notes", (req, res) => {
    let createNewNote = req.body;
    let noteList = JSON.parse(fs.readFileSync(dbPath));
    let notelength = (noteList.length).toString();

    //create new property called id based on length and assign it to each json object
    createNewNote.id = notelength;
    //push updated note to the data containing notes history in db.json
    noteList.push(createNewNote);

    //write the updated data to db.json
    fs.writeFileSync(dbPath, JSON.stringify(noteList));
    res.json(noteList);
})

//delete note according to their assigned id.
router.delete("/api/notes/:id", (req, res) => {
  
    const notes = JSON.parse(fs.readFileSync(dbPath));
    const noteId = (req.params.id).toString();
   
    // filter all notes that does not have matching id and add them as a new array
    // the matching array will be deleted
    const filteredNotes = notes.filter(selected =>{
        return selected.id != noteId;
    })

    //write the updated data to db.json and display the updated note
    fs.writeFileSync(dbPath, JSON.stringify(filteredNotes));
    res.json(filteredNotes);
});


module.exports = router;