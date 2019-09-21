
const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)

    debugger
    
    if (!note) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = title => {
    const notes = loadNotes()
    const index = notes.findIndex(note => note.title === title)

    if (index !== -1) {
        notes.splice(index, 1)
        saveNotes(notes)
        console.log(chalk.green.inverse('Note ' + title + ' removed!'))
    } else {
        console.log(chalk.red.inverse('Note ' + title + ' not found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    notes.forEach(note => console.log(chalk.inverse(note.title)))
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)

    if (note) {
        console.log(chalk.green.inverse('Title: ' + note.title))
        console.log(chalk.green.inverse('Body: ' + note.body))
    } else {
        console.log(chalk.red.inverse('Note ' + title + ' not found!'))
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
}