const express = require('express');
const uuid = require('uuid');
const app = express();

const PORT = process.env.PORT || 3000;

// will share any static html files with the browser
app.use( express.static('public') );
// accept incoming POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = './app/db.json';

let noteList = [{id: "0000-0000-0000-0000", title: 'note1', text: 'note1 text'}];

app.get("/api/notes", function(req, res) {
      res.send( noteList );
})

app.delete("/api/notes/:id", function(req, res) {
  const id = req.params.id
  noteList.splice(noteList.indexOf(id), 1);
  res.send( { message: "deleted it!"} )
})

app.post("/api/notes", function(req, res) {
    console.log( `req.body: `, req.body )
    
    const newNote = req.body
    newNote.id = uuid.v4()
    console.log( `[POST /api/notes] adding: `, newNote )
    noteList.push( newNote );
    res.send( { message: "saved it!"} )
  });
app.listen(PORT, function() {
    console.log(`Serving notes on PORT ${PORT}`)
})
