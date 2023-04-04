import { NoteArray } from "./NoteArray.js";
import { Modals } from "./Modals.js";

export class  NoteList{


static listChanger(){
    const activeListId = document.querySelector('.listContainer').querySelector('.active').id;
    const listToDisplay = NoteArray.filter(p=> p.listId === activeListId);
    document.body.querySelector('.userNotes').innerHTML = '';
    for(const noteObj of listToDisplay)
        {
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


    static listDelator(listId){

        const DOMItem = document.getElementById(listId);;
        DOMItem.remove();
        localStorage.setItem('lists' , JSON.stringify(listContainer));
        
        for(let i = 0 ; i<NoteArray.length;i++){

            if(NoteArray[i].listId === listId){
                const index = NoteArray.indexOf(NoteArray[i])
                NoteArray.splice(index , 1);
                i = i-1;
            }
        }
        localStorage.setItem('notes' , JSON.stringify(NoteArray));
        const firstItem = document.querySelector('#firstItem');
        firstItem.click();

    }
}