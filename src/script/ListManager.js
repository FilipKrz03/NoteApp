import { List } from "./List.js";
import { Tool } from "./Tool.js";

export class ListManager{

    lists = []
    constructor(){
        this.createDefaultList();
    }

    createDefaultList(){
        this.addList('Default' , 1);
    }

    addNote(title , body , id , activeListId, create = true) {
       const activeId = Number(activeListId);
        let index;
       for(let i = 0 ; i<this.lists.length; i++){
        if(this.lists[i].id === activeId){
            index = i;
        } 
       }

       if(create)
       {
        const list = this.lists[index];
         list.createNote(title , body , id);
       }
       

         const userNotes = document.querySelector('.userNotes');
         userNotes.innerHTML = '';

         for(const note of this.lists[index].notes){
        const noteTemplate = document.getElementById('noteTemplate');
        const noteEl = document.importNode(noteTemplate.content , true);
        noteEl.querySelector('h2').textContent = note.title;
        noteEl.querySelector('p').textContent =  note.body;
        noteEl.querySelector('.note').id  = note.id;
        noteEl.querySelector('img').addEventListener('click' , (event) => {
            event.stopPropagation();
            Tool.delateNoteModal(id , document.querySelector('.active').id);
        })
        userNotes.append(noteEl);
     }

    } 
    
    addList(content , id){
       
        const listContainer = document.querySelector('.listContainer'); 
        const list = new List(content , id);
        const storageLists = JSON.parse(localStorage.getItem('lists')) || [];
        this.lists.push(list);
        storageLists.push(list);
        localStorage.setItem('lists' , JSON.stringify(storageLists));
        const listEl = document.createElement('div');
        listEl.className = 'listItem';
        listEl.innerHTML = `${list.content} <img src="/src/img/trash3.svg" alt="trash" id="listTrash">`;
        listEl.id = list.id;
        listContainer.append(listEl);
        this.changeList(id);
        listEl.querySelector('#listTrash').addEventListener('click' , (event) => {
            event.stopPropagation();
            this.delateList(id);
            const defaultList = document.getElementById(1);
            defaultList.classList.add('active');
            this.addNote('' , '' , '' , 1 , false);
        });
        listEl.addEventListener('click' , ()=>{
            this.changeList(id);
            this.addNote('' , '' , '' , id , false);
        });
    }

    changeList(id){
        
        const newActiveElement = document.getElementById(id);
        const allLists = document.querySelectorAll('.listItem');
        allLists.forEach(list => {
            if(list.classList.contains('active')){
                list.classList.remove('active');
            }
        })
        newActiveElement.classList.add('active');
    }

    delateList(id){
        const listToDelate = document.getElementById(id);
        listToDelate.remove();
       const index =  this.lists.indexOf(x => {
            return x.id === id;
        })
        this.lists.splice(index);
    }

    delateNote(id , activeListId){
        
        const activeId = Number(activeListId);
        let index;
        for(let i = 0 ; i<this.lists.length; i++){
         if(this.lists[i].id === activeId){
             index = i;
         } 
        }

        const noteIndex = this.lists[index].notes.indexOf(x => {
            return x.id === id;
        })
        this.lists[index].notes.splice(noteIndex , 1);
       
        this.addNote('' , '' , id , activeId , false);
    }
}