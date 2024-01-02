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


    // * Открытие модального окна
    show(): Modal {
        this.modalWindow.style.visibility = 'visible';
        this.modalWindow.style.opacity = '1';
        return this;
    }

    // * Закрытие модального окна
    close(): Modal {
        this.modalWindow.style.visibility = 'hidden';
        this.modalWindow.style.opacity = '0';
        return this;
    }

    // * Установка текста в модальном окне
    setText(text: string): Modal {
        this.modalContent.querySelector("#modalText")!.textContent = text;
        return this;
    }

    // * Установка ошибки в модальном окне
    setError(): Modal {
        this.modalContent.querySelector("#modalText")!.classList.add("modal__error");
        return this;
    }

    setSuccess(): Modal {
        this.modalContent.querySelector("#modalText")!.classList.add("modal__success");
        return this;
    }
}