export class ModalCloser {

    static closeModal(modal){
        const modalToClose = document.querySelector(modal)
        const overlay = document.getElementById('overlay');
        modalToClose.classList.remove('active');
        overlay.classList.remove('active');
    }
}