const noteCtrl = {};
const Note = require('../models/note')


noteCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note')
}

noteCtrl.createNewNote = async (req, res) => {
    const {title, description} = req.body;
    const newNote = new Note({title, description})
    await newNote.save()

    res.redirect('/notes')
}

noteCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find().lean();
    res.render('notes/all-notes', {notes}) //pasar las notes como un objeto a all-notes.hbs
}

noteCtrl.renderEditForm = (req, res) => {
    res.send("render edit form")
}

noteCtrl.updateNote = (req, res) => {
    res.send("update note")
}

noteCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.redirect('/notes')
}

module.exports = noteCtrl;