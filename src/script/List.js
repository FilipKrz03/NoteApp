import { Note } from "./Note.js";

export class List{
    notes = [];

    constructor(content , id){
        this.content = content;
        this.id = id; 
    }

    createNote(title, body , id)
    {
        const note = new Note(title , body , id);
        this.notes.push(note);
    }
}