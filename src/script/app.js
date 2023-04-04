import { Modals } from "./Modals.js";
import { NoteList } from "./NoteList.js";
import { ListManager } from "./Components/ListManager.js";


class App{
    static init(){
        const modals = new Modals();
        const list = new NoteList();
        const listManage = new ListManager();
    }

    static createContentFromLocalStorage(){
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        console.log(notes);
        const lists = JSON.parse(localStorage.getItem('lists')) || [];
        console.log(lists);
    }


}


App.createContentFromLocalStorage();
App.init();


