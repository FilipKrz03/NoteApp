import { Note } from "./Note.js";
import {ModalCloser} from './Components/ModalCloser.js';

let isAdded = false

export class Modals {

    constructor(){
        this.modalListen();
        this.modalAddNote();
    }

  

    modalListen(){
        const overlay = document.getElementById('overlay');
        const addNoteBtn = document.querySelector('.addNote');
        const modal = document.querySelector('.modal');
        addNoteBtn.addEventListener('click' ,() => {
            modal.classList.add('active');
            overlay.classList.add('active')
            const backModal = document.getElementById('backModal');
           backModal.addEventListener('click' , ModalCloser.closeModal.bind(null , '.modal'));
           overlay.addEventListener('click' , ModalCloser.closeModal.bind(null , '.modal'));
        })
    }

    modalAddNote(){
        const form = document.querySelector('.modal').querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let title = form.querySelector('#title').value;
            let body = form.querySelector('#body').value;
            const note = new Note(title , body);
            ModalCloser.closeModal('.modal');
        })
    }


    static  rejectDecision(){
        const closeModal = document.querySelector('.closeModal');
        const overlay = document.getElementById('overlay');
        closeModal.classList.remove('active');
        overlay.classList.remove('active');
    }


    static modalCloseDecision(id){
        const closeModal = document.querySelector('.closeModal');
        const overlay = document.getElementById('overlay');
        closeModal.classList.add('active');
        overlay.classList.add('active');
        let confrim = closeModal.querySelector('.confrim');
        const newElement = confrim.cloneNode(true);
        confrim.parentNode.replaceChild(newElement , confrim);
        const reject = document.querySelector('.reject');
        const close = closeModal.querySelector('img');
        newElement.addEventListener('click' , Note.noteDelator.bind(null , id));
        if(isAdded === false)
        {
            reject.addEventListener('click' , ModalCloser.closeModal.bind(null , '.closeModal'));
            overlay.addEventListener('click' , ModalCloser.closeModal.bind(null , '.closeModal'));
            close.addEventListener('click' , ModalCloser.closeModal.bind(null , '.closeModal'));
            isAdded = true;
        }
    }

}


