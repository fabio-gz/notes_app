const {Router} = require('express');
const { renderNoteForm, createNewNote, renderNotes, renderEditForm, updateNote, deleteNote} = require('../controllers/notes.controller');

const router = Router()

//new note
router.get('/notes/add', renderNoteForm)
router.post('/notes/new-note', createNewNote)

//get notes
router.get('/notes', renderNotes)

//edit notes
router.get('/notes/edit/:id', renderEditForm)
router.put('/notes/edit/:id', updateNote) 

//delete notes
router.delete('/notes/delete/:id', deleteNote)

module.exports = router