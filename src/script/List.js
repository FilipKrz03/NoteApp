import { Note } from "./Note.js";

export class List{
    notes = [];

    constructor(content , id){
        this.content = content;
        this.id = id; 
    }

  static  createNote(title, body , id , index , userData)
    {
        const note = new Note(title , body , id , userData);
        const storageList = JSON.parse(localStorage.getItem('lists'));
        storageList[index].notes.push(note)
        localStorage.setItem('lists' , JSON.stringify(storageList));
    }
}