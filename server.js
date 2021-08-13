const express = require("express");
const path = require("path");
const webRouter = require('./routes/webRoute');
const apiRouter = require('./routes/apiRoute');

// Sets up the Express App
const app = express();
// Sets port for listening and let heroku decide on port, if not, use port 3001
const PORT = process.env.PORT || 3001;

//serve images, CSS files, and JavaScript files in a directory named public
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.json());

//import api router
app.use(apiRouter);
//import web router
app.use(webRouter);


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "404.html"));
});



//listen tot he port when deployed
app.listen(PORT, () => console.log("Server listening on port " + PORT));