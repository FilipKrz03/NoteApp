import { List } from "./List.js";
import { Tool } from "./Tool.js";

export class ListManager{
    
    constructor(){
        this.createDefaultList();
    }

    createDefaultList(){
        const storageList = JSON.parse(localStorage.getItem('lists')) || [];
        let onlyOneList = false;
        if(storageList.length === 0){
            this.addList('Default' , 1);
            onlyOneList = true;
            return;
        }
        for(const list of storageList){
            if(!onlyOneList){
            const content = list.content;
            const id = list.id;
            this.addList(content , id , false);
            }
        }
        const activeId = JSON.parse(localStorage.getItem('activeId'));
        this.addNote('' , '' , '' , activeId, false);

    }

    addNote(title , body , id , activeListId, create = true , userData) {

       const activeId = Number(activeListId);
       let storageLists = JSON.parse(localStorage.getItem('lists'));
        let index;
       for(let i = 0 ; i<storageLists.length; i++){
        if(storageLists[i].id === activeId){
            index = i;
        } 
       }
       if(create)
       {
         List.createNote(title , body , id , index , userData);
         storageLists = JSON.parse(localStorage.getItem('lists'));
       }
       
         const userNotes = document.querySelector('.userNotes');
         userNotes.innerHTML = '';
         for(const note of storageLists[index].notes){

        const noteTemplate = document.getElementById('noteTemplate');
        const noteEl = document.importNode(noteTemplate.content , true);
        noteEl.querySelector('h2').textContent = note.title;
        noteEl.querySelector('p').textContent =  note.body;
        noteEl.querySelector('.data').textContent =  note.userData;
        noteEl.querySelector('.note').id  = note.id;
     
        noteEl.querySelector('img').addEventListener('click' , (event) => {
            event.stopPropagation();
            Tool.delateNoteModal(id , document.querySelector('.active').id);
        })
        userNotes.append(noteEl);
     }

    } 
    
    addList(content , id , create = true){
       
        
        const list = new List(content , id);
        const storageLists = JSON.parse(localStorage.getItem('lists')) || [];
        if(create){
        storageLists.push(list);
        localStorage.setItem('lists' , JSON.stringify(storageLists));
        }
        const listContainer = document.querySelector('.listContainer'); 
        const listEl = document.createElement('div');
        listEl.className = 'listItem';
        listEl.innerHTML = `${list.content} <img src="/src/img/trash3.svg" alt="trash" id="listTrash">`;
        listEl.id = list.id;
        listContainer.append(listEl);
        this.changeList(id);
        this.addNote('' , '' , '' , id , false);
        if(id !== 1){
        listEl.querySelector('#listTrash').addEventListener('click' , (event) => {
            event.stopPropagation();
            const allLists = document.querySelectorAll('.listItem');
            allLists.forEach(list => {
                list.classList.remove('active');
            })
            const defaultList = document.getElementById(1);
            defaultList.classList.add('active');
            this.addNote('' , '' , '' , 1 , false);
            this.delateList(id);
       
        });
    }
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
        localStorage.setItem('activeId' , JSON.stringify(id));
    }

    delateList(id){
        const listToDelate = document.getElementById(id);
        listToDelate.remove();
        const storageList = JSON.parse(localStorage.getItem('lists'));
        let index;
        for(let i = 0 ; i<storageList.length ; i++){
            if(storageList[i].id === id)
            index = i;
        }
        console.log(index);
        storageList.splice(index , 1);
        localStorage.setItem('lists', JSON.stringify(storageList));
    }

    delateNote(id , activeListId){
        const storageList = JSON.parse(localStorage.getItem('lists'));
        const activeId = Number(activeListId);
        let index;
        for(let i = 0 ; i<storageList.length; i++){
         if(storageList[i].id === activeId){
             index = i;
         } 
        }
        
        const noteIndex = storageList[index].notes.indexOf(x => {
            return x.id === id;
        })
    
        storageList[index].notes.splice(noteIndex, 1);
        localStorage.setItem('lists', JSON.stringify(storageList));
        this.addNote('' , '' , id , activeId , false);
    }
}