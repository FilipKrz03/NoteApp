import { ListManager } from "./ListManager.js";
import { Modals } from "./Modals.js";

export class Tool{

    static listManager = new ListManager();

   static  addAddListListener(){
        const addBtn = document.getElementById('listAddBtn');
        addBtn.addEventListener('click' , ()=> {
            let listName = document.getElementById('listName');
            if(listName.value === ''){
                alert('You need to enter list name ');
                return;
            }
            this.listManager.addList(listName.value , Math.random());
            listName.value = '';
        })
    }

  static async noteTool(){
        
        const form = document.querySelector('form');
        let userData;

        try{
        const data = await axios.get("http://worldtimeapi.org/api/timezone/Europe/Warsaw")
         userData = await data.data.datetime;
        userData  = await userData.slice(0 , 10);
        }
        catch (err){
            console.log(err);
            userData = '2023-04-02'
        }

        form.addEventListener('submit' , (event) => {
            event.preventDefault();
            const title = form.querySelector('#title');
            const body = form.querySelector('#body');
            if(title.value === ''){
                alert('You need to add note title');
                return;
            }
            if(body.value === ''){
                alert('you need to add note body');
                return;
            }
            const noteId = Math.random();
            const activeListId = document.querySelector('.active').id;
            const modal = document.querySelector('.modal').classList.remove('active');
            const overlay = document.getElementById('overlay').classList.remove('active');
            this.listManager.addNote(title.value , body.value , noteId , activeListId , true , userData);
            body.value = '';
            title.value = '';
        })
    } 

    static delateNoteModal(id, activeListId){
        const modal = document.querySelector('.closeModal');
        const overlay = document.getElementById('overlay');
        modal.classList.add('active');
        overlay.classList.add('active');
        const delateDecision = modal.querySelector('.confrim');
        const handler = () => {
            this.listManager.delateNote(id , activeListId);
            Modals.closeDelateModal();
            delateDecision.removeEventListener('click' , handler);
        }
        delateDecision.addEventListener('click' , handler );
        }


        static defaultList(){
            const defList = document.getElementById(1);
            defList.querySelector('#listTrash').addEventListener('click' , () => {
                alert('Cannot remove default list');
            })
        }
}

    














