//! Класс модального окна
export class Modal {

    //* Поля
    private modalWindow: HTMLElement;
    private closeButton: HTMLButtonElement;
    private modalContent: HTMLElement;

    //* Конструктор
    constructor(modalWindow: HTMLElement, closeButton: HTMLButtonElement, modalContent: HTMLElement) {
        this.modalWindow = modalWindow;
        this.closeButton = closeButton;
        this.modalContent = modalContent;
    }

    //* Свойства
    get ModalWindow(): HTMLElement { return this.modalWindow; }
    get CloseButton(): HTMLButtonElement { return this.closeButton; }
    get ModalContent(): HTMLElement { return this.modalContent; }

    show(): Modal {
        this.modalWindow.style.visibility = 'visible';
        this.modalWindow.style.opacity = '1';
        return this;
    }

    close(): Modal {
        this.modalWindow.style.visibility = 'hidden';
        this.modalWindow.style.opacity = '0';
        return this;
    }

    setText(text: string): Modal {
        this.modalContent.querySelector("p")!.textContent = text;
        return this;
    }
}