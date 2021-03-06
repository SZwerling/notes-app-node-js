const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find((note) => note.title === title); //if no duplicate found, returns undefined
    
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green('new note added'))
    } else {
        console.log(chalk.red('note title taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter((note) => note.title !== title);
    if(notes.length > filteredNotes.length){
        console.log(chalk.green(`Title '${title}' was removed`))
        return saveNotes(filteredNotes);
    } else {
        console.log(chalk.red(`Title '${title}' not found.`))
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green('Your notes...'));
    return notes.map(note =>  console.log(chalk.blue(note.title)));
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if(!note){
        return console.log(chalk.red('error, no such note'))
    } else {
    }
    console.log(chalk.blue(note.title));
    console.log(chalk.green(note.body));
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)

}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch (e) {
        return [];
    }
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}