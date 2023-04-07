export class Modals {
    
    static noteModalListiner(){
        const addNoteBtn = document.querySelector('.addNoteBtn');
        const modal = document.querySelector('.modal');
        const overlay = document.getElementById('overlay');
        const closeModalBtn = modal.querySelector('#backModal');
        addNoteBtn.addEventListener('click' , () => {
            modal.classList.add('active');
            overlay.classList.add('active');
        })
        closeModalBtn.addEventListener('click' , () => {
            modal.classList.remove('active');
            overlay.classList.remove('active');
        })
        overlay.addEventListener('click' , () => {
            modal.classList.remove('active');
            overlay.classList.remove('active');
        })
    }

    static closeDelateModal(){
         document.querySelector('.closeModal').classList.remove('active');
         document.getElementById('overlay').classList.remove('active');
    }

    static closeDelateModalListener(){
        const modal = document.querySelector('.closeModal');
        const rejectToDelateButton = modal.querySelector('.reject');
        const closeModalButton = modal.querySelector('img');
        rejectToDelateButton.addEventListener('click' , () => {
            Modals.closeDelateModal();
        })  
        closeModalButton.addEventListener('click' , () => {
            Modals.closeDelateModal();
        })  
        overlay.addEventListener('click' , () => {
            Modals.closeDelateModal();
        })
    }
}