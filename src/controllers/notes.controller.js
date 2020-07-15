const noteCtrl = {};
const Note = require('../models/note')


noteCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note')
}

noteCtrl.createNewNote = async (req, res) => {
    const {title, description} = req.body;
    const newNote = new Note({title, description})
    await newNote.save()
    req.flash('success_msg', 'Note Added successfully') //flash is added from the server

    res.redirect('/notes')
}

noteCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find().lean();
    res.render('notes/all-notes', {notes}) //pasar las notes como un objeto a all-notes.hbs
}

noteCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean()
    res.render('notes/edit-note', {note})
}

noteCtrl.updateNote = async (req, res) => {
    const { title, description } = req.body
    await Note.findByIdAndUpdate(req.params.id, {title, description})
    req.flash('success_msg', 'Note updated successfully')
    res.redirect('/notes')
}

noteCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note deleted successfully')
    res.redirect('/notes')
}

module.exports = noteCtrl;