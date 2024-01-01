//! Класс модального окна
export class Modal {
    //* Поля
    modalWindow;
    closeButton;
    modalContent;
    //* Конструктор
    constructor(modalWindow, closeButton, modalContent) {
        this.modalWindow = modalWindow;
        this.closeButton = closeButton;
        this.modalContent = modalContent;
    }
    //* Свойства
    get ModalWindow() { return this.modalWindow; }
    get CloseButton() { return this.closeButton; }
    get ModalContent() { return this.modalContent; }
    show() {
        this.modalWindow.style.visibility = 'visible';
        this.modalWindow.style.opacity = '1';
        return this;
    }
    close() {
        this.modalWindow.style.visibility = 'hidden';
        this.modalWindow.style.opacity = '0';
        return this;
    }
    setText(text) {
        this.modalContent.querySelector("p").textContent = text;
        return this;
    }
}
