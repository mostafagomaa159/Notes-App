const fs = require('fs')
const chalk = require('chalk')

const addNote =  (title, body)=> {
    const notes = loadNotes()
    const duplicateNotes = notes.find((notes)=>{note.title===title})
    
  
    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note Added Successfully!'))
    } else {
        console.log(chalk.red.inverse('This Note already Exist!'))
    }
}

const saveNotes =  (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = (title)=>{
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note Removed Successfully!'))
        saveNotes(notesToKeep)
    }else {
        console.log(chalk.red.inverse('There is not Note with this Title!'))
    }

}
const listNotes =()=>{
    const notes=loadNotes()
    console.log(chalk.inverse('Your Notes'))
    notes.forEach(note => {
        console.log(note.title)
    });

}
const readNote =(title)=>{
const notes = loadNotes()
const note = notes.find((note) => note.title === title)
if(note){
    console.log(chalk.inverse(note.title))
    console.log(chalk.inverse(note.body))
}else{
    console.log(chalk.red.inverse('Note not Found!'))
}
}

module.exports = {
  
    addNote: addNote,
    removeNote: removeNote,   
    listNotes:listNotes ,
    readNote:readNote,
}