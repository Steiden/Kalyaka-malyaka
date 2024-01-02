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
    // * Открытие модального окна
    show() {
        this.modalWindow.style.visibility = 'visible';
        this.modalWindow.style.opacity = '1';
        return this;
    }
    // * Закрытие модального окна
    close() {
        this.modalWindow.style.visibility = 'hidden';
        this.modalWindow.style.opacity = '0';
        return this;
    }
    // * Установка текста в модальном окне
    setText(text) {
        this.modalContent.querySelector("#modalText").textContent = text;
        return this;
    }
    // * Установка ошибки в модальном окне
    setError() {
        this.modalContent.querySelector("#modalText").classList.add("modal__error");
        return this;
    }
    setSuccess() {
        this.modalContent.querySelector("#modalText").classList.add("modal__success");
        return this;
    }
}
