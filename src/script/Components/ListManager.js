import { Note } from "../Note.js";
import { NoteList } from "../NoteList.js";

export class ListManager{

    constructor(){
        this.addList();
    }

    addList(){
        const firstItem = document.getElementById('firstItem');
        const temp = firstItem.cloneNode(true);
        firstItem.parentElement.replaceChild(temp , firstItem);
        temp.addEventListener('click' , this.manageLists);
        const listContainer = document.querySelector('.listContainer');
        const addBtn = document.querySelector('header button');
        addBtn.addEventListener('click' , () => {
            const input = document.getElementById('listName').value;
            const list = document.createElement('div');
            list.className = 'listItem';
            list.innerHTML = `${input} <img src="/src/img/trash3.svg" alt="trash" id="listTrash">`
            list.id = Math.random();
            const listClose = list.querySelector('img');
             /* listClose.addEventListener('click' , NoteList.listDelator.bind(null , list.id));  */
             listClose.addEventListener('click' , function(event){
                event.stopPropagation();
                NoteList.listDelator(list.id);
             })
            listContainer.append(list);
            this.manageLists();
            list.click();
        })
    }

    manageLists(){
        const allLists = document.querySelectorAll('.listItem');
        allLists.forEach(list => {
    
            list.addEventListener('click' , () =>{
                allLists.forEach(item => {
                    item.classList.remove('active');
                })
                list.classList.add('active');
                NoteList.listChanger();
            })
        })
    }
}