import { NoteArray } from "./NoteArray.js";
import { Modals } from "./Modals.js";
import { ModalCloser } from "./Components/ModalCloser.js";


export class Note {

    constructor(title,body){
        this.title = title;
        this.body = body;
        this.addNote(title , body);
    }

 async addNote(title , body){

        const data = await axios.get('http://worldtimeapi.org/api/timezone/Europe/Warsaw')
        let time = await data.data.datetime.slice(0,10);

        const id = Math.random();
        const activeListId = document.querySelector('.listContainer').querySelector('.active').id;
        const obj = {
            listId : activeListId,
            id:id,
            title:title,
            body:body,
            time:time,
        }
        NoteArray.push(obj);
        localStorage.setItem('notes' , JSON.stringify(NoteArray));


        const listToDisplay = NoteArray.filter(p=> p.listId === activeListId);
    
        document.body.querySelector('.userNotes').innerHTML = '';
        for(const noteObj of listToDisplay){
        const template = document.getElementById('noteTemplate');
        const noteEl = document.importNode(template.content , true);
        noteEl.querySelector('h2').textContent = noteObj.title;
        noteEl.querySelector('p').textContent = noteObj.body;
        noteEl.querySelector('.data').textContent = noteObj.time;
        noteEl.querySelector('.note').id = noteObj.id;
        noteEl.querySelector('img').addEventListener('click' , Modals.modalCloseDecision.bind(null , noteObj.id));
        document.querySelector('.userNotes').append(noteEl);
        }
    }

   static  noteDelator(id){
       document.getElementById(id).remove();
        const index = NoteArray.map(object => object.id).indexOf(id);
          NoteArray.splice(index , 1);
          localStorage.setItem('notes' , JSON.stringify(NoteArray));
       ModalCloser.closeModal('.closeModal');
    }
}